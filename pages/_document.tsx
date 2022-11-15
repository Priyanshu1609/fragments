import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          strategy="afterInteractive"
          src={`https://www.clarity.ms/tag/`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "eiueinyahw");
          `,
          }}
        />
        <link
          rel="preload"
          href="/fonts/Britanica-BlackRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> */}
      </Head>
      <body className=" font-britanica font-normal ">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
