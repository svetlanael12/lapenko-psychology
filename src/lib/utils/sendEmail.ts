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
    port: 465,
    secure: true, // true для 465 порта
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: Boolean(Number(process.env.DEBUG)) ? {
      rejectUnauthorized: false, // Для локального тестирования (в продакшене лучше использовать валидный сертификат)
    } : {
      minVersion: 'TLSv1.2',
      ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
      rejectUnauthorized: true // Всегда true в продакшене
    },
    connectionTimeout: 10000, // 10 секунд
    greetingTimeout: 5000,
    socketTimeout: 10000
  });

  const date = params.slot
    ? `${new Date(params.slot.date).toLocaleDateString("ru-RU")} (${params.slot.startTime
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
