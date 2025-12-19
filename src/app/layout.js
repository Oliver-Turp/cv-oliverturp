import "./globals.css";
import { Libre_Baskerville, Inter } from "next/font/google";

const serif = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-serif"
});

const sans = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-sans"
});

export const metadata = {
    title: "Curriculum Vitae",
    description: "The curriculum vitae of Oliver Turp, an Aggregation Analyst based in the UK."
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${serif.variable} ${sans.variable}`}>
            <body>{children}</body>
        </html>
    );
}
