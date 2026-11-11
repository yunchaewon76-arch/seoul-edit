import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SEOUL EDIT — корейская красота и мода", template: "%s | SEOUL EDIT" },
  description: "SEOUL EDIT: корейская красота, мода и культура — подробные статьи на русском языке с оригинальными источниками и ссылками на товары.",
  robots: { index: true, follow: true }
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ru"><body><Header/><main id="main-content">{children}</main><Footer/></body></html>;
}
