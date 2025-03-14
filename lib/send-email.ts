import axios from "axios";

interface EmailParams {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ from, to, subject, html }: EmailParams) => {
  const endpoint = "https://ENDPOINT";
  const response = await axios.post(
    endpoint,
    {
      kimden: from,
      kime: to,
      konu: subject,
      mesaj: html,
    },
    {
      headers: {
        token: process.env.MAIL_TOKEN,
      },
    }
  );
  return response;
};
