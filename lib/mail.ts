import { sendEmail } from "./send-email";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await sendEmail({
    from: "reaktor@ankara.bel.tr",
    to: email,
    subject: "Parola Sıfırlama | Reaktor",
    html: `<p>Reaktor hesabınızın parolasını sıfırlama talebinde bulundunuz. <a href="${resetLink}">buraya</a> tıklayarak sıfırlayabilirsiniz. Eğer böyle bir talepte bulunmadıysanız lütfen dikkate almayınız.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await sendEmail({
    from: "reaktor@ankara.bel.tr",
    to: email,
    subject: "E-posta Adresinizi Doğrulayın | Reaktor",
    html: `<p>Reaktor hesabınızı onaylamak için <a href="${confirmLink}">linke</a> tıklayabilirsiniz.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendEmail({
    from: "reaktor@ankara.bel.tr",
    to: email,
    subject: "2FA Kodunuz | Reaktor",
    html: `<p>2FA Kodunuz: ${token}</p>`,
  });
};
