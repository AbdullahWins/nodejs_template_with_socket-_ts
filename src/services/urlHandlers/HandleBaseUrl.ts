import { Request } from "express";

/**
 * Gets the server's base URL based on the request object.
 * @param req - The Express request object.
 * @returns The server's base URL.
 */
const getServerBaseUrl = (req: Request): string => {
  // Construct the server base URL
  const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
  return serverBaseUrl;
};

export default getServerBaseUrl;
