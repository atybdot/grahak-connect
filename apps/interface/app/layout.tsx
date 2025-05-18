import { QueryProvider } from "@/components/providers/query";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${fontSans.variable} font-sans antialiased`}>
				{/* <QueryProvider>{children}</QueryProvider> */}
				{children}
			</body>
			<Toaster richColors />
		</html>
	);
}
