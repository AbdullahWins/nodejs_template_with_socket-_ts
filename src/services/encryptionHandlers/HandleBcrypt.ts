import bcrypt from "bcrypt";
import { logger } from "../logHandlers/HandleWinston";

const hashPassword = async (password: string): Promise<string | null> => {
  try {
    const saltRounds = 10;
    const stringPassword = password?.toString();
    const hashedPassword = await bcrypt.hash(stringPassword, saltRounds);
    logger.log("info", "Password hashed successfully");
    return hashedPassword;
  } catch (error: any) {
    logger.log("error", error?.message);
    return null;
  }
};

const comparePasswords = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const stringInputPassword = inputPassword?.toString();
    const stringHashedPassword = hashedPassword?.toString();

    const passwordMatch = await bcrypt.compare(
      stringInputPassword,
      stringHashedPassword
    );
    if (!passwordMatch) {
      logger.log("error", "Password did not match");
      return false;
    } else {
      logger.log("info", "Password matched");
      return true;
    }
  } catch (error: any) {
    logger.log("error", error?.message);
    return false;
  }
};

export { hashPassword, comparePasswords };
