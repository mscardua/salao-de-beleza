import "./globals.css";
import React from "react";

export const metadata = {
  title: 'Glow Hair',
  description: 'Sistema de gestão e agendamento para o Glow Hair',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className="bg-[#0B132B] text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}