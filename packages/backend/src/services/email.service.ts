import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from '../lib/logger.js';

export interface SendResetOtpOptions {
  to: string;
  name: string;
  otp: string;
  resetToken?: string;
}

export interface SendPasswordChangedOptions {
  to: string;
  name: string;
}

export class EmailService {
  private static transporter: Transporter | null = null;

  private static getTransporter(): Transporter | null {
    if (env.NODE_ENV === 'test') return null;
    if (this.transporter) return this.transporter;

    if (env.SMTP_USER && env.SMTP_PASS) {
      const isGmail = env.SMTP_HOST?.includes('gmail') || env.SMTP_USER.includes('@gmail.com');
      this.transporter = nodemailer.createTransport(
        isGmail
          ? {
              service: 'gmail',
              auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
              },
            }
          : {
              host: env.SMTP_HOST || 'localhost',
              port: env.SMTP_PORT,
              secure: env.SMTP_SECURE,
              auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
              },
            }
      );
      logger.info('📧 Real SMTP Email Transporter initialized successfully');
      return this.transporter;
    }

    return null;
  }

  /**
   * Sends a 6-digit OTP code and optional one-click reset link to the user.
   */
  static async sendPasswordResetOtp({ to, name, otp, resetToken }: SendResetOtpOptions): Promise<{ delivered: boolean; devOtp?: string }> {
    const transporter = this.getTransporter();
    const resetUrl = resetToken
      ? `${env.FRONTEND_URL}/reset-password?email=${encodeURIComponent(to)}&token=${encodeURIComponent(resetToken)}&otp=${encodeURIComponent(otp)}`
      : `${env.FRONTEND_URL}/reset-password?email=${encodeURIComponent(to)}`;

    const subject = `[Proofly] ${otp} is your verification code`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080c16; color: #f8fafc; margin: 0; padding: 40px 20px; }
    .card { max-width: 540px; margin: 0 auto; background-color: #0c1326; border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .logo { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff; margin-bottom: 24px; }
    .logo-accent { color: #ff451a; }
    .title { font-size: 20px; font-weight: 800; color: #ffffff; margin-bottom: 8px; }
    .desc { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 28px; }
    .otp-box { background-color: #101934; border: 2px dashed rgba(255,69,26,0.4); border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 28px; }
    .otp-code { font-family: 'SF Mono', Monaco, Menlo, Consolas, monospace; font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #ff451a; margin: 0; }
    .otp-hint { font-size: 12px; color: #94a3b8; margin-top: 8px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #ff451a 0%, #ff7b00 100%); color: #ffffff; font-size: 14px; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 14px; margin-bottom: 28px; text-align: center; }
    .footer { font-size: 12px; color: #64748b; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">PROOFLY<span class="logo-accent">.</span></div>
    <div class="title">Reset Your Password</div>
    <div class="desc">Hello ${name || 'Builder'}, we received a request to reset your Proofly account password. Use this single-use 6-digit verification code:</div>
    <div class="otp-box">
      <div class="otp-code">${otp}</div>
      <div class="otp-hint">Expires in 15 minutes • Do not share this code with anyone</div>
    </div>
    <div style="text-align: center;">
      <a href="${resetUrl}" class="btn">Click Here to Reset Password</a>
    </div>
    <div class="footer">
      If you did not request this password reset, please ignore this email. Your current password remains safe and untouched.
    </div>
  </div>
</body>
</html>
    `;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to,
          subject,
          html,
        });
        logger.info(`📧 Password reset OTP email sent to ${to}`);
        return { delivered: true, devOtp: env.NODE_ENV !== 'production' ? otp : undefined };
      } catch (err: any) {
        logger.error(`❌ Failed to send reset email via SMTP to ${to}: ${err?.message}`);
      }
    }

    // Dev Fallback Logging
    console.log('\n======================================================');
    console.log('🔑 [PROOFLY AUTH] PASSWORD RESET VERIFICATION CODE:');
    console.log(`👤 Recipient: ${to} (${name})`);
    console.log(`🔢 6-DIGIT OTP: >> ${otp} <<`);
    console.log(`🔗 Direct Link: ${resetUrl}`);
    console.log(`⏱️  Valid for:  15 minutes`);
    console.log('======================================================\n');

    return { delivered: false, devOtp: env.NODE_ENV !== 'production' ? otp : undefined };
  }

  /**
   * Sends confirmation that the password was changed.
   */
  static async sendPasswordChangedNotification({ to, name }: SendPasswordChangedOptions): Promise<void> {
    const transporter = this.getTransporter();
    const subject = `[Proofly] Security Alert: Your password was successfully changed`;
    const html = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background-color: #080c16; color: #f8fafc; padding: 40px 20px;">
  <div style="max-width: 500px; margin: 0 auto; background-color: #0c1326; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 32px;">
    <h2 style="color: #00f59b; margin-top: 0;">Password Changed Successfully</h2>
    <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">Hello ${name || 'Builder'},</p>
    <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">The password for your Proofly account (${to}) was updated just now. All previous active sessions have been revoked for your security.</p>
    <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">If you did NOT perform this change, please contact support immediately.</p>
  </div>
</body>
</html>
    `;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: env.EMAIL_FROM,
          to,
          subject,
          html,
        });
        logger.info(`📧 Password change confirmation sent to ${to}`);
      } catch (err: any) {
        logger.error(`❌ Failed to send password changed alert to ${to}: ${err?.message}`);
      }
    } else {
      logger.info(`🔔 [DEV ALERT] Password changed notification triggered for ${to}`);
    }
  }
}
