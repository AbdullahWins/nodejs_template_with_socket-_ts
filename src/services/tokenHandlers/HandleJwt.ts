import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { logger } from "../logHandlers/HandleWinston";
import { CustomError } from "../responseHandlers/HandleResponse";

const jwtSecret: Secret = process.env.JWT_SECRET_KEY as string;
const expiresIn: string = process.env.JWT_EXPIRES_IN as string;

const generateToken = (payload: string): string => {
  try {
    const token = jwt.sign({ _id: payload }, jwtSecret, {
      expiresIn: expiresIn,
    } as SignOptions);
    logger.log("info", "Token generated successfully");
    return token;
  } catch (error) {
    logger.log("error", `Error generating JWT token: ${error.message}`);
    throw new CustomError(500, "Error generating token");
  }
};

const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    logger.log("info", "Token decoded successfully");
    return decoded;
  } catch (error) {
    logger.log("error", `Error verifying JWT token: ${error.message}`);
    throw new CustomError(401, "Invalid token");
  }
};

export { generateToken, verifyToken };
