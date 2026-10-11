import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SEOUL EDIT — корейская красота и мода", template: "%s | SEOUL EDIT" },
  description: "Корейская красота, мода и тренды: краткие обзоры и редакционные материалы на русском языке. Демонстрационная версия.",
  robots: { index: false, follow: false }
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ru"><body><Header/><main id="main-content">{children}</main><Footer/></body></html>;
}
