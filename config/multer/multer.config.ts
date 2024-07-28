import multer, { StorageEngine, MulterError } from "multer";
import path from "path";
import fs from "fs";
import { Application, Request, Response, NextFunction } from "express";
import { sendResponse } from "../../src/services/responseHandlers/HandleResponse";

// Function to initialize Multer with storage settings
const initializeMulter = (app: Application): void => {
  const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      const uploadDir = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, "uploads");
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

  // Example of using multer to handle different types of file uploads:
  app.use(
    upload.fields([
      { name: "single", maxCount: 1 },
      { name: "multiple", maxCount: 10 },
    ])
  );

  // Custom Multer error handler middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof MulterError) {
      return sendResponse(res, 500, err.message);
    } else {
      next(err);
    }
  });

  // For handling a single file
  //   app.use(upload.single("file"));

  // For handling multiple files (e.g., with input field name "files")
  // app.use(upload.array("files", 10));

  // Handle any field name for file uploads
  //   app.use(upload.any());

  // If you want to limit the number of files and their size, you can use the following:
  // app.use(upload.array("files", 10)); // 10 is the maximum number of files allowed

  // If you want to handle mixed types of fields (single and multiple files), you can use:
  // app.use(upload.fields([{ name: "singleFile", maxCount: 1 }, { name: "multipleFiles", maxCount: 10 }]));
};

export { initializeMulter };
