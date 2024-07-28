import { createServer, Server as HTTPServer } from "http";
import { configureApp } from "../express";
import { initializeSocket } from "../socket";
import { Application } from "express";

// Configure the Express app
const app: Application = configureApp({});

// Create HTTP server for Express and Socket.IO
const httpServer: HTTPServer = createServer(app);

// Initialize Socket.IO with the HTTP server
initializeSocket(httpServer);

// Export the HTTP server
export { httpServer };
