// lib/email.ts
import nodemailer from "nodemailer";

import { SlotDTO } from "../models/AppointmentSlot";

interface EmailParams {
  // email: string;
  firstName: string;
  phone: string;
  slot?: SlotDTO;
}

export async function sendConfirmationEmail(params: EmailParams) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465, // SSL
    secure: true,
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: process.env.DEBUG
      ? {
          rejectUnauthorized: false, // Для локального тестирования (в продакшене лучше использовать валидный сертификат)
        }
      : {
          minVersion: "TLSv1.2", // Современный стандарт
        },
  });

  const date = params.slot
    ? `${new Date(params.slot.date).toLocaleDateString()} (${
        params.slot.startTime
      } - ${params.slot.endTime})`
    : "Не указано";

  const mailOptions = {
    from: process.env.EMAIL_LOGIN,
    to: process.env.EMAIL_LOGIN_TO,
    subject: "Новая заявка на сеанс",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0056b3;">Новая заявка на сеанс</h2>
        <p><strong>Имя:</strong> ${params.firstName}</p>
        <p><strong>Телефон:</strong> ${params.phone}</p>
        <p><strong>Желаемая дата и время сеанса:</strong> ${date}</p>
       
      </div>
    `,
  };

  try {
    console.log("Email ");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
