import fs from "fs/promises"; // Using the promises version of fs
import path from "path";
import mime from "mime-types";
import { UniqueNaam } from "uniquenaam/uniquenaam";
import { Request } from "express";
import { compressImage } from "../fileModificationHandlers/HandleCompression";
import { CustomError } from "../responseHandlers/HandleResponse";
import getServerBaseUrl from "../urlHandlers/HandleBaseUrl";

interface File {
  originalname: string;
  path: string;
}

interface HandleFileUploadParams {
  req: Request;
  files: File[];
  folderName: string;
}

const handleFileUpload = async ({
  req,
  files,
  folderName,
}: HandleFileUploadParams): Promise<string[]> => {
  try {
    // Define the destination directory relative to the root directory
    const destinationDir = path.join(process.cwd(), "uploads", folderName);
    const baseUrl = getServerBaseUrl(req);

    // Create the destination directory if it doesn't exist
    await fs.mkdir(destinationDir, { recursive: true });

    const uploadedUrls: string[] = [];
    for (const file of files) {
      const uniqueFilename = UniqueNaam(file.originalname);
      const source = file.path;
      const destination = path.join(destinationDir, uniqueFilename);

      // Check if the uploaded file is an image
      const mimeType = mime.lookup(file.originalname);
      if (mimeType && mimeType.startsWith("image/")) {
        // Compress only image files
        const compressedSource = await compressImage(source);

        // Ensure the source file exists before moving
        try {
          await fs.access(compressedSource, fs.constants.F_OK);
          await fs.rename(compressedSource, destination);

          // Construct the file URL
          const fileUrl = `${baseUrl}/uploads/${folderName}/${uniqueFilename}`;
          uploadedUrls.push(fileUrl);
        } catch (error) {
          console.error(`Error moving file: ${error}`);
        }
      } else {
        // If the file is not an image, directly move it to destination
        try {
          await fs.rename(source, destination);

          // Construct the file URL
          const fileUrl = `${baseUrl}/uploads/${folderName}/${uniqueFilename}`;
          uploadedUrls.push(fileUrl);
        } catch (error) {
          console.error(`Error moving file: ${error}`);
        }
      }
    }
    return uploadedUrls;
  } catch (error) {
    throw new CustomError(500, "Error uploading file");
  }
};

export { handleFileUpload };
