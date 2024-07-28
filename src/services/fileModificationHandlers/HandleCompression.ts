import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { CustomError } from "../responseHandlers/HandleResponse";

// Initial quality setting for image compression (1-100)
const initialQuality = 60;
// Target file size in bytes for compression (in KB)
const targetFileSize = 150 * 1024;
// File size threshold to trigger compression (in KB)
const compressionTriggerSize = 200 * 1024;

interface CompressionOptions {
  quality: number;
}

/**
 * Adjust the compression options based on the desired output file size.
 * @param fileSize - The current file size.
 * @param quality - The current quality setting.
 * @param targetFileSize - The target file size.
 * @returns The adjusted compression options.
 */
function adjustCompressionOptions(
  fileSize: number,
  quality: number,
  targetFileSize: number
): CompressionOptions {
  const compressionRatio = fileSize / targetFileSize;
  return {
    quality: Math.max(1, Math.min(100, Math.floor(quality / compressionRatio))),
  };
}

/**
 * Compress the image file based on the specified compression options.
 * @param inputFilePath - The path to the image file to be compressed.
 * @returns The path to the compressed image file.
 * @throws {CustomError} If there is an error during compression.
 */
async function compressImage(inputFilePath: string): Promise<string> {
  try {
    // Determine the output format based on the file extension of the input file
    const outputFormat = path.extname(inputFilePath).slice(1);

    // Get the file stats to determine the file size
    const stats = await fs.stat(inputFilePath);
    const fileSize = stats.size;

    // Check if the file size is larger than the compression trigger size
    if (fileSize > compressionTriggerSize) {
      // Read the uncompressed image data
      const uncompressedData = await fs.readFile(inputFilePath);

      // Compress the image data with initial compression options
      let compressionOptions: CompressionOptions = { quality: initialQuality };
      let compressedData = await sharp(uncompressedData)
        .toFormat(outputFormat, compressionOptions)
        .toBuffer();

      // Get the size of the compressed data
      const compressedFileSize = compressedData.length;

      // Check if the compressed file size exceeds the target size
      if (compressedFileSize > targetFileSize) {
        // Adjust the compression options based on the compressed file size
        compressionOptions = adjustCompressionOptions(
          compressedFileSize,
          initialQuality,
          targetFileSize
        );

        // Re-compress the image data with adjusted compression options
        compressedData = await sharp(uncompressedData)
          .toFormat(outputFormat, compressionOptions)
          .toBuffer();
      }

      // Verify if the compression is successful and compressed data is available
      if (!compressedData || compressedData.length === 0) {
        throw new CustomError(500, "Error compressing image");
      }

      // Overwrite the original file with the compressed data
      await fs.writeFile(inputFilePath, compressedData);
    }

    // Return the input file path
    return inputFilePath;
  } catch (error) {
    throw new CustomError(500, "Error compressing image");
  }
}

export { compressImage };
