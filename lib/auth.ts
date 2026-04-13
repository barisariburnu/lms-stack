import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, emailOTP } from "better-auth/plugins";
import { prisma } from "./db";
import { env } from "./env";
import resend from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        const { data, error } = await resend.emails.send({
          from: "LMSStack <onboarding@lmsstack.dev>",
          to: [email],
          subject: "LMSStack - Verify your email",
          html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin(),
  ],
  secret: env.BETTER_AUTH_SECRET,
  url: env.BETTER_AUTH_URL,
});
