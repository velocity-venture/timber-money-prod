import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { trackRequest, checkSuspiciousPatterns } from "./security-monitor";

import helmet from "helmet";

const app = express();

// 1) Force HTTPS (trust proxy needed on Replit) and canonical non-www
app.set("trust proxy", 1);
app.use((req: Request, res: Response, next: NextFunction) => {
  // Force HTTPS
  if (req.protocol !== "https") {
    return res.redirect(301, "https://" + req.headers.host + req.originalUrl);
  }
  // Canonical: redirect www → non-www
  const host = req.headers.host || "";
  if (host.startsWith("www.")) {
    const nonWww = host.slice(4);
    return res.redirect(301, `https://${nonWww}${req.originalUrl}`);
  }
  return next();
});

// 2) Security headers via Helmet + custom CSP
app.use(
  helmet({
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: false },
    // We’ll set a custom CSP below
    contentSecurityPolicy: false,
  }),
);

// Content Security Policy tailored for Replit + OpenAI API
app.use((req: Request, res: Response, next: NextFunction) => {
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "img-src 'self' data: blob:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline'", // allow Vite inline in dev; tighten in prod if possible
    "connect-src 'self' https://api.openai.com https://api.stripe.com",
    "font-src 'self' data:",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
  res.setHeader("Content-Security-Policy", csp);
  // Optional extra hardening:
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  next();
});
app.use((req, res, next) => {
  // Critical: Set headers for ALL responses including errors

  // Prevent clickjacking attacks - SAMEORIGIN allows our own app to iframe itself if needed
  // but DENY is more secure if we never need iframes
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Enable browser XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Control referrer information
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions Policy (formerly Feature Policy)
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=()",
  );

  // Content Security Policy - comprehensive protection
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com", // unsafe-eval needed for Vite in dev
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' ws: wss: https://api.stripe.com https://api.openai.com", // ws: for Vite HMR
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "frame-ancestors 'none'", // Additional clickjacking protection
    "font-src 'self' data:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ];

  // In development, be more permissive for Vite
  if (app.get("env") !== "development") {
    res.setHeader("Content-Security-Policy", cspDirectives.join("; "));
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security monitoring middleware (minimal overhead, async logging)
app.use((req, res, next) => {
  // Skip static assets for performance
  if (
    req.path.startsWith("/assets") ||
    req.path.endsWith(".js") ||
    req.path.endsWith(".css")
  ) {
    return next();
  }

  // Check rate limiting (non-blocking)
  if (!trackRequest(req)) {
    return res
      .status(429)
      .json({ message: "Too many requests. Please slow down." });
  }

  // Check for suspicious patterns (fast regex checks)
  if (!checkSuspiciousPatterns(req)) {
    return res.status(400).json({ message: "Invalid request detected." });
  }

  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Cloud Run automatically sets this. Only fallback to 5000 in development.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT!, 10) || 5000;
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
