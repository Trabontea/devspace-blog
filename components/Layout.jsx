import Head from 'next/head'
import Header from './Header'

export default function Layout({ title, keywords, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords}></meta>
        <meta name="description" content={description}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto my-7">{children}</main>
    </>
  )
}

Layout.defaultProps = {
  title: 'Welcome to DevSpace',
  keywords: 'development, coding, programing',
  description: 'The best info and prog',
}
