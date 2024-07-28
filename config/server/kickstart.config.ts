import { logger } from "../../src/services/logHandlers/HandleWinston";
import { connectToDatabase } from "../databases";
import { httpServer } from "./http";

const port = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 5000;

async function kickstartServer(): Promise<void> {
  try {
    // Connect to MongoDB using Mongoose
    await connectToDatabase();

    // Start the HTTP server
    httpServer.listen(port, () => {
      logger.log("info", `Server is running on port: ${port}`);
    });
  } catch (error) {
    // Log the error and exit the process
    logger.log("error", "Error starting the server: ", error);

    // Gracefully exit the process
    process.exit(1);
  }
}

export { kickstartServer };
