import fs from "fs/promises";
import path from "path";
import { URL } from "url";

/**
 * Deletes a file given its URL.
 * @param fileUrl - The URL of the file to delete.
 * @returns A boolean indicating success (true) or failure (false).
 */
const handleFileDelete = async (fileUrl: string): Promise<boolean> => {
  try {
    // Parse the URL to extract the filename
    const parsedUrl = new URL(fileUrl);
    const filename = path.basename(parsedUrl.pathname);

    // Construct the file path
    const filePath = path.join(__dirname, "../../../uploads", filename);

    // Check if the file exists
    await fs.access(filePath, fs.constants.F_OK);

    // Delete the file
    await fs.unlink(filePath);

    console.log(`File deleted: ${filePath}`);
    return true; // Indicate successful deletion
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
    return false; // Indicate failure to delete
  }
};

export { handleFileDelete };
