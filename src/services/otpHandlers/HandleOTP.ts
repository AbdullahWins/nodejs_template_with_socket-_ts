import { Timekoto } from "timekoto";
import OTP from "../../models/Otp/OtpModel";
import { logger } from "../logHandlers/HandleWinston";
import { sendPasswordResetOTPEmail } from "../emailHandlers/HandleEmail";

interface OtpData {
  email: string;
  otp: number;
  expiresAt: number;
}

interface SendOtpInput {
  email: string;
}

interface MatchOtpInput {
  email: string;
  otp: number;
}

interface ValidateOtpInput {
  email: string;
  otp: number;
}

// Create a 4-digit OTP
const createOTP = (): number => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  logger.info(`A new OTP has been created`);
  return otp;
};

// Save the OTP to the database
const saveOTP = async ({ email, otp }: OtpData): Promise<OtpData | null> => {
  const existingOtp = await OTP.findOne({ email });
  if (existingOtp) {
    const expiresAt = Timekoto() + 60 * 3; // 3 mins in seconds
    const updatedOtp = await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { new: true }
    );
    logger.info(`An existing OTP has been updated for: ${email}`);
    return updatedOtp;
  } else {
    const newOtp = await OTP.create({ email, otp });
    logger.info(`A new OTP has been saved for: ${email}`);
    return newOtp;
  }
};

// Send the OTP to the user
const sendOTP = async ({
  email,
}: SendOtpInput): Promise<{ error?: string; message?: string }> => {
  try {
    if (!email) {
      return { error: "Email is required" };
    }

    const otp = createOTP();
    const savedOtp = await saveOTP({ email, otp });
    if (!savedOtp) {
      return { error: "Failed to send OTP" };
    }

    const code = otp;
    const status = await sendPasswordResetOTPEmail({ email, code });
    if (!status?.code === 200) {
      return { error: `${email} doesn't exist` };
    }

    logger.info(`Password reset OTP sent to: ${email}`);
    return { message: "Password reset OTP sent successfully" };
  } catch (error) {
    logger.error(error?.message);
    return { message: `Failed to reset ${email} password` };
  }
};

// Match the OTP
const matchOTP = async ({
  email,
  otp,
}: MatchOtpInput): Promise<{ isMatch: boolean; message: string }> => {
  const savedOtp = await OTP.findOne({ email });
  if (savedOtp?.otp === otp) {
    if (savedOtp?.expiresAt > Timekoto()) {
      return { isMatch: true, message: "OTP matched!" };
    } else {
      return { isMatch: false, message: "OTP expired!" };
    }
  } else {
    logger.info(`OTP did not match for: ${email}`);
    return { isMatch: false, message: "OTP did not match!" };
  }
};

// Validate the OTP
const validateOTP = async ({
  email,
  otp,
}: ValidateOtpInput): Promise<{ error?: string; message?: string }> => {
  try {
    if (!otp || !email) {
      return { error: "All fields are required" };
    }

    const otpMatch = await matchOTP({ email, otp });
    if (!otpMatch.isMatch) {
      logger.info(`OTP did not match for: ${email}`);
      return { error: otpMatch.message };
    } else {
      logger.info(`OTP validated successfully for: ${email}`);
      return { message: otpMatch.message };
    }
  } catch (error) {
    logger.error(error?.message);
    return { message: `Failed to reset ${email} password` };
  }
};

export { createOTP, saveOTP, sendOTP, matchOTP, validateOTP };
