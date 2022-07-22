import { Head, Html, Main, NextScript } from 'next/document'

import { NEXT_PUBLIC_HEAP_ANALYTICS_KEY } from '../__generated__/_env'
import { isHeapEnabled } from '../constants/environment'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Don't add anything that changes page by page to the head */}
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="/icons/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="/icons/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="/icons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="/icons/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="60x60"
          href="/icons/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="/icons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="76x76"
          href="/icons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="/icons/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon-128.png"
          sizes="128x128"
        />
        <meta name="msapplication-TileColor" content="#2FAB9F" />
        <meta
          name="msapplication-TileImage"
          content="/icons/mstile-144x144.png"
        />
        <meta
          name="msapplication-square70x70logo"
          content="/icons/mstile-70x70.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/icons/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/icons/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/icons/mstile-310x310.png"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {NEXT_PUBLIC_HEAP_ANALYTICS_KEY && isHeapEnabled ? (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
        window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("${NEXT_PUBLIC_HEAP_ANALYTICS_KEY}");
        `,
            }}
          />
        ) : null}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
