import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
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
            <body className=' font-britanica font-normal '>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}