import { Request, Response, NextFunction } from "express";

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const logData = {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${Date.now() - startTime}ms`,
      userAgent: req.get("user-agent"),
      ip: req.ip,
      context: "HttpRequest",
      userId: req.user?.userId,
      query: Object.keys(req.query).length ? req.query : undefined,
      body: Object.keys(req.body || {}).length ? req.body : undefined,
    };

    if (res.statusCode >= 400) {
      console.error("Request failed", logData);
    } else {
      console.info("Request completed", logData);
    }
  });

  next();
};
