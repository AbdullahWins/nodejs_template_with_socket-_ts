import nodemailer, { Transporter } from "nodemailer";
import { IEmailConfig } from "../../src/interfaces";

// Type assertions and initialization
const emailConfig: IEmailConfig = {
  host: process.env.SENDER_EMAIL_HOSTNAME as string,
  port: parseInt(process.env.SENDER_EMAIL_PORT as string, 10),
  user: process.env.SENDER_EMAIL_ID as string,
  pass: process.env.SENDER_EMAIL_PASSWORD as string,
};

// Ensure that all required environment variables are defined
if (
  !emailConfig.host ||
  isNaN(emailConfig.port) ||
  !emailConfig.user ||
  !emailConfig.pass
) {
  throw new Error(
    "One or more email configuration environment variables are missing."
  );
}

// Create the Nodemailer transporter with type annotations
const nodemailerTransporter: Transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

export { nodemailerTransporter };
