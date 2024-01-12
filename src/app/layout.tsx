import './globals.css';
import Script from 'next/script';
import localFont from 'next/font/local';
import clsx from 'clsx';

import { getMetaData } from './sharedMetadata';

const notoSans = localFont({
  src: [
    { path: '../../public/fonts/NotoSans-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/NotoSans-Medium.woff2', weight: '500' },
  ],
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata = getMetaData({ url: '/' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="light">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
        <meta
          name="google-site-verification"
          content="yAPCOjrjXkneaFLU21zJVUZT_mDKpTL3BM8QPsHgvN0"
        />
        <meta name="naver-site-verification" content="88b9c255f0df08e92cbae6304a803dd3ac832411" />
      </head>
      <body className={clsx(notoSans.className, 'font-normal')}>
        <div className="mx-auto flex min-h-[100dvh] max-w-lg flex-col shadow-md">{children}</div>
      </body>
    </html>
  );
}
