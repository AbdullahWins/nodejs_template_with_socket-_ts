import express, { Application } from "express";
import { initializeCors } from "../../cors";
import { initializeMulter } from "../../multer";
import { initializeHelmet } from "../../helmet";
import { initializeMonitoring } from "../../monitorings";
import { MainRouter } from "../../../src/routes/Main/MainRouter";
import { globalErrorHandler } from "../../../src/services/responseHandlers/HandleResponse";

const configureApp = (server: any): Application => {
  // Initialize Express app
  const app: Application = express();

  // Middleware for parsing URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  // Middleware to collect request duration
  app.use(initializeMonitoring);

  // Initialize helmet
  // initializeHelmet(app);

  // Initialize CORS
  initializeCors(app);

  // Initialize Multer
  initializeMulter(app);

  // Routes
  app.use(MainRouter);

  // Global Error Handling Middleware
  app.use(globalErrorHandler);

  return app;
};

export { configureApp };
