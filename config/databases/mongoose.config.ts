import mongoose, { ConnectOptions } from "mongoose";
import { logger } from "../../src/services/logHandlers/HandleWinston";

const connectToDatabase = async (): Promise<void> => {
  // Access environment variables with type assertions
  const mongooseUri = process.env.MONGOOSE_URI as string;
  const databaseName = process.env.DATABASE_NAME as string;

  // Ensure that the environment variables are defined
  if (!mongooseUri || !databaseName) {
    logger.log(
      "error",
      "Environment variables MONGOOSE_URI or DATABASE_NAME are not set."
    );
    process.exit(1);
  }

  const uri = `${mongooseUri}/${databaseName}`;

  try {
    await mongoose.connect(uri, {
      writeConcern: { w: "majority" },
    } as ConnectOptions);
    logger.log("info", "Connected to MongoDB using Mongoose!");
  } catch (error) {
    logger.log(
      "error",
      `Error connecting to MongoDB using Mongoose: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    process.exit(1);
  }
};

export { connectToDatabase };
