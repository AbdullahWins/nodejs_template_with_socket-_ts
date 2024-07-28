import fs from "fs";
import path from "path";
import { nodemailerTransporter } from "../../../config/emails";

interface SendEmailOptions {
  email: string;
  code: string;
}

const sendPasswordResetOTPEmail = async ({
  email,
  code,
}: SendEmailOptions): Promise<string> => {
  try {
    // Read the HTML template file
    const emailTemplatePath = path.join(
      __dirname,
      "../../views/emails/ResetPassword.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    // Replace placeholders in the template
    const formattedEmail = emailTemplate.replace("{{code}}", code);

    const info = await nodemailerTransporter.sendMail({
      from: `"${process.env.SENDER_EMAIL_NAME}" <${process.env.SENDER_EMAIL_ID}>`,
      to: email,
      subject: "Reset Your Password",
      html: formattedEmail,
    });

    return info.messageId || "Message ID not available";
  } catch (error: any) {
    return error?.message || "Error sending email";
  }
};

const sendEmail = async (
  receiver: string,
  subject: string,
  code: string
): Promise<string> => {
  try {
    // Read the HTML template file
    const emailTemplatePath = path.join(
      __dirname,
      "../../views/emails/ResetPassword.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

    // Replace placeholders in the template
    const formattedEmail = emailTemplate.replace("{{code}}", code);

    const info = await nodemailerTransporter.sendMail({
      from: `"${process.env.SENDER_EMAIL_NAME}" <${process.env.SENDER_EMAIL_ID}>`,
      to: receiver,
      subject: subject,
      html: formattedEmail,
    });

    return info.messageId || "Message ID not available";
  } catch (error: any) {
    return error?.message || "Error sending email";
  }
};

export { sendPasswordResetOTPEmail, sendEmail };
