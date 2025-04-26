import type { Metadata } from "next";
import "./globals.css";

import { Sofia_Sans } from "next/font/google";
import React from "react";

import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";

import RootStyleRegistry from "./emotion";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Татьяна Лапенко - КПТ и ACT психолог онлайн | Москва",
  description:
    " Психолог Татьяна Лапенко: помощь в преодолении тревоги, депрессии и проблем в отношениях. КПТ и ACT терапия онлайн. Научный подход, конфиденциальность. Запись на консультацию!",
  keywords: [
    "психолог Москва",
    "клинический психолог",
    "КПТ терапия",
    "ACT терапия",
    "когнитивно-поведенческая терапия",
    "онлайн психолог",
    "тревога",
    "депрессия",
    "отношения",
    "самооценка",
    "злость",
    "агрессия",
    "навязчивые мысли",
    "Татьяна Лапенко",
  ],
  icons: {
    icon: [{ url: "./favicon.ico", sizes: "any" }],
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en">
      <body className={`${sofiaSans.variable} `}>
        <RootStyleRegistry>
          <React.Fragment>
            <Header />
            <div style={{ minHeight: "100vh" }}>{children}</div>

            <Footer />
          </React.Fragment>
        </RootStyleRegistry>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
