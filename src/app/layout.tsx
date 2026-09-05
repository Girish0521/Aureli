import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aureli - AI Online Trial Room',
  description: 'AI-powered virtual try-on with 3D human models generated from your measurements',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
