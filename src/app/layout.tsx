import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "@/services/apolloClient";

export const metadata: Metadata = {
  title: "Hero - Integração Voltbras - Conta Azul",
  description:
    "Sistema para realização da integração entre as plataformas Voltbras e Conta Azul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
