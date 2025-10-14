import express, { type Request, type Response, type NextFunction } from "express";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { registerStripeRoutes } from "./stripe-routes";
import { setupVite, serveStatic, log } from "./vite";
import { trackRequest, checkSuspiciousPatterns } from "./security-monitor";
import { timberAnalyticsRouter } from "./timber-analytics";
import { timberAdminRouter } from "./timber-admin";
import { docsRouter } from "./docs-intake";
import { isAuthenticated } from "./replitAuth";

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: false },
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const isDev = req.app.get("env") === "development";
  const directives: string[] = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `connect-src 'self' ${isDev ? "ws: wss:" : ""} https://api.openai.com https://api.stripe.com`,
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "upgrade-insecure-requests",
  ];
  res.setHeader("Content-Security-Policy", directives.join("; "));
  next();
});

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()");
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host || "";
  if (req.protocol !== "https") {
    return res.redirect(301, `https://${host}${req.originalUrl}`);
  }
  if (host.startsWith("www.")) {
    const nonWww = host.slice(4);
    return res.redirect(301, `https://${nonWww}${req.originalUrl}`);
  }
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/assets") || req.path.endsWith(".js") || req.path.endsWith(".css")) {
    return next();
  }
  if (!trackRequest(req)) {
    return res.status(429).json({ message: "Too many requests. Please slow down." });
  }
  if (!checkSuspiciousPatterns(req)) {
    return res.status(400).json({ message: "Invalid request detected." });
  }
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let captured: any;
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    captured = body;
    return originalJson(body);
  };
  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const duration = Date.now() - start;
      let line = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (captured) {
        try {
          const s = JSON.stringify(captured);
          if (s.length < 2000) line += `: ${s}`;
        } catch {}
      }
      try { log(line); } catch {}
    }
  });
  next();
});

(async () => {
  const server = await registerRoutes(app);
  registerStripeRoutes(app);
  
  // Timber analytics
  app.use("/api/timber", timberAnalyticsRouter);
  
  // Timber admin dashboard (protected)
  app.use("/admin", timberAdminRouter);
  
  // Document processing with PDF/OCR (requires authentication)
  app.use("/api/docs", isAuthenticated, docsRouter);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`Server running on port ${port}`);
  });
})();
