import cors, { CorsOptions } from "cors";
import { Application } from "express";
import { CustomError } from "../../src/services/responseHandlers/HandleResponse";
import { logger } from "../../src/services/logHandlers/HandleWinston";

const allowedOrigins: string[] = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    logger.log("silly", `Request Origin: ${origin}`);
    if (allowedOrigins.includes(origin || "") || !origin) {
      logger.log("silly", "Request has been allowed by CORS");
      callback(null, true);
    } else {
      callback(new CustomError(403, "Request not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// With configuration
const initializeCors = (app: Application) => {
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
};

export { allowedOrigins, initializeCors };
