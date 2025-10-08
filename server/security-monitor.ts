/**
 * Copyright (c) 2025 Shoebox to Autopilot. All Rights Reserved.
 * Security monitoring and suspicious activity detection
 */

import { Request } from "express";
import { log } from "./vite";

interface SuspiciousActivity {
  timestamp: Date;
  ip: string;
  userId?: string;
  type: string;
  details: string;
  userAgent?: string;
}

// In-memory tracking (in production, use Redis or database)
const recentRequests = new Map<string, number[]>();
const suspiciousActivities: SuspiciousActivity[] = [];

// Configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100; // Max requests per IP per minute
const MAX_AUTH_ATTEMPTS = 5; // Max login attempts
const SUSPICIOUS_PATTERNS = [
  /(\.\.|\/\/|\\\\)/,  // Path traversal attempts
  /<script|javascript:|onerror|onclick/i,  // XSS attempts
  /union.*select|drop.*table|insert.*into|delete.*from/i,  // SQL injection
  /\$\{|%24%7B|%2524%257B/,  // Template injection
  /\.\.\//,  // Directory traversal
];

// Track request rates (non-blocking, minimal overhead)
export function trackRequest(req: Request): boolean {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  
  // Get or create request history for this IP
  if (!recentRequests.has(ip)) {
    recentRequests.set(ip, []);
  }
  
  const requests = recentRequests.get(ip)!;
  
  // Remove old requests outside the window
  const validRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  // Add current request
  validRequests.push(now);
  recentRequests.set(ip, validRequests);
  
  // Check if rate limit exceeded
  if (validRequests.length > MAX_REQUESTS_PER_WINDOW) {
    logSuspiciousActivity({
      timestamp: new Date(),
      ip,
      type: 'RATE_LIMIT_EXCEEDED',
      details: `${validRequests.length} requests in ${RATE_LIMIT_WINDOW}ms window`,
      userAgent: req.headers['user-agent'] as string
    });
    return false; // Block request
  }
  
  return true; // Allow request
}

// Check for suspicious patterns in request
export function checkSuspiciousPatterns(req: Request): boolean {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const checkString = `${req.path}${JSON.stringify(req.query)}${JSON.stringify(req.body)}`;
  
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(checkString)) {
      logSuspiciousActivity({
        timestamp: new Date(),
        ip,
        type: 'SUSPICIOUS_PATTERN',
        details: `Pattern detected: ${pattern.toString()} in request`,
        userAgent: req.headers['user-agent'] as string
      });
      return false; // Block request
    }
  }
  
  return true; // Allow request
}

// Log suspicious activity (async, non-blocking)
export function logSuspiciousActivity(activity: SuspiciousActivity): void {
  // Add to in-memory log
  suspiciousActivities.push(activity);
  
  // Keep only last 1000 activities in memory
  if (suspiciousActivities.length > 1000) {
    suspiciousActivities.shift();
  }
  
  // Log to console (in production, send to monitoring service)
  log(`⚠️ SECURITY: ${activity.type} from ${activity.ip} - ${activity.details}`);
}

// Track failed authentication attempts
const authAttempts = new Map<string, number>();

export function trackAuthAttempt(identifier: string, success: boolean): boolean {
  if (success) {
    // Reset on successful auth
    authAttempts.delete(identifier);
    return true;
  }
  
  // Track failed attempt
  const attempts = (authAttempts.get(identifier) || 0) + 1;
  authAttempts.set(identifier, attempts);
  
  if (attempts >= MAX_AUTH_ATTEMPTS) {
    logSuspiciousActivity({
      timestamp: new Date(),
      ip: identifier,
      type: 'EXCESSIVE_AUTH_ATTEMPTS',
      details: `${attempts} failed authentication attempts`
    });
    return false; // Block further attempts
  }
  
  return true; // Allow retry
}

// Get recent suspicious activities (for admin dashboard)
export function getRecentSuspiciousActivities(limit: number = 100): SuspiciousActivity[] {
  return suspiciousActivities.slice(-limit).reverse();
}

// Cleanup old data periodically (runs every 5 minutes)
setInterval(() => {
  const now = Date.now();
  
  // Clean up old request tracking data
  for (const [ip, requests] of recentRequests.entries()) {
    const validRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
    if (validRequests.length === 0) {
      recentRequests.delete(ip);
    } else {
      recentRequests.set(ip, validRequests);
    }
  }
  
  // Clean up old auth attempts (reset after 1 hour)
  for (const [identifier] of authAttempts.entries()) {
    // In production, check timestamp of last attempt
    // For now, just clear periodically
    if (Math.random() > 0.9) { // 10% chance to clear each cycle
      authAttempts.delete(identifier);
    }
  }
}, 5 * 60 * 1000); // 5 minutes