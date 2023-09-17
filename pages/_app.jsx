import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Other meta tags, title, and other head elements */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
