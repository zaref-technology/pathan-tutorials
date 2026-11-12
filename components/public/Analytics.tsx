import Script from "next/script";

// Google Analytics 4. Renders nothing unless NEXT_PUBLIC_GA_ID is set to a valid measurement ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,}$/;

export default function Analytics() {
  if (!GA_ID_PATTERN.test(GA_ID)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
