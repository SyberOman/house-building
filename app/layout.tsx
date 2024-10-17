import './globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Providers } from './providers';

const cairo = Cairo({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'لوحة التحكم - إدارة بناء المنزل',
  description: 'لوحة تحكم لإدارة مشروع بناء المنزل',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}