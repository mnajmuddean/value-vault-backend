import express from 'express';
import { ENV } from '@/config/env';
import { errorHandler } from '@/middleware/errorHandler';
import { setupSecurityHeaders } from '@/middleware/securityHeaders';
import { apiLimiter } from '@/middleware/rateLimiter';
import { authLimiter } from '@/middleware/rateLimiter';
import cors from 'cors';
import { requestId } from '@/middleware/requestId';
import { loggingMiddleware } from '@/middleware/loggingMiddleware';
import { compressionMiddleware } from '@/middleware/performanceMiddleware';
import { ErrorMonitoringService } from '@/services/errorMonitoring.service';
import { ErrorRequestHandler } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './docs/swagger';
import { notFoundHandler } from './middleware/notFound';
import itemRoutes from './routes/item.routes';
import premiseRoutes from './routes/premise.route';
import calculateRoutes from './routes/calculate.routes';

const app = express();

// Initialize error monitoring
ErrorMonitoringService.getInstance();

// Group middleware by function
const setupMiddleware = (app: express.Application) => {
  // Security
  app.use(requestId);
  setupSecurityHeaders(app as express.Express);
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'x-api-key',
        'x-portal-id',
      ],
      exposedHeaders: ['Content-Length', 'X-Requested-With'],
      credentials: true,
    })
  );

  // Performance
  app.use(compressionMiddleware);
  app.use(express.json({ limit: '10kb' }));

  // Monitoring
  app.use(loggingMiddleware);

  // Rate Limiting
  app.use('/api/auth', authLimiter);
  app.use('/api', apiLimiter);
};

setupMiddleware(app);

// Routes
app.get('/', (req, res) => {
  res.json({ message: '🚀 Hello from ValueVault Backend!' });
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
});

// Move Swagger docs before error handler
const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
  },
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Express TypeScript API Documentation',
};

app.use('/api/items', itemRoutes);
app.use('/api/premises', premiseRoutes);
app.use('/api/calculate', calculateRoutes);

// Add Swagger documentation route at root level
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(specs, swaggerOptions));

// Error Handler should be last
const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  return errorHandler(err, req, res, next);
};

app.use(errorMiddleware);

// Add this as the last middleware (before error handler)
app.use(notFoundHandler);

export default app;
