import mongoose from "mongoose";
import { logger } from "../logHandlers/HandleWinston";

/**
 * Checks if the given ID is a valid MongoDB ObjectId.
 * @param id - The ID to be checked.
 * @returns True if the ID is a valid ObjectId, false otherwise.
 */
const ObjectIdChecker = (id: string | null | undefined): boolean => {
  if (id === null || id === "" || id === undefined) {
    logger.log(
      "error",
      "Invalid ObjectId: Id is either null/empty string/undefined!"
    );
    return false;
  }

  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    logger.log("error", `Invalid ObjectId: ${id}`);
    return false;
  } else {
    logger.log("info", `Valid ObjectId: ${id}`);
    return true;
  }
};

export { ObjectIdChecker };
