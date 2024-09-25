import { roboto, manrope } from "@/components/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function RootLayout( {children, params: {locale, slug}} ) {
  const messages = useMessages();
  
  return (
    <html lang={locale} className={`${roboto.variable} ${manrope.variable}`}>
    <body>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header/>
      {children}
      <Footer/>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
