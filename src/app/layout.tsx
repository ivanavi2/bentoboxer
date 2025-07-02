import type { Metadata } from "next";
import { Sora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { Analytics } from "@vercel/analytics/react";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | BentoBoxer - Bento Grid Editor',
    default: 'BentoBoxer - Visual Bento Grid Editor & Layout Creator'
  },
  description: 'Create stunning bento box layouts with our intuitive drag-and-drop editor. Generate responsive CSS/HTML code for dashboard designs, portfolios, and modern web interfaces. Free online bento grid creator with live preview.',
  keywords: [
    'bento grid editor',
    'bento box layout',
    'grid design tool',
    'dashboard creator',
    'bento grid generator',
    'visual layout editor',
    'css grid builder',
    'responsive grid designer',
    'no-code grid tool',
    'web layout creator'
  ],
  authors: [{ name: 'BentoBoxer Team' }],
  creator: 'BentoBoxer',
  publisher: 'BentoBoxer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bentoboxer.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BentoBoxer - Visual Bento Grid Editor & Layout Creator',
    description: 'Create stunning bento box layouts with our intuitive drag-and-drop editor. Generate responsive CSS/HTML code for modern web interfaces.',
    url: 'https://bentoboxer.com',
    siteName: 'BentoBoxer',
    images: [
      {
        url: '/logo.png',
        width: 858,
        height: 858,
        alt: 'BentoBoxer - Bento Grid Editor Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BentoBoxer - Visual Bento Grid Editor',
    description: 'Create stunning bento box layouts with our intuitive drag-and-drop editor. Generate responsive CSS/HTML code.',
    images: ['/logo.png'],
    creator: '@bentoboxer',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <ToastProvider />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
