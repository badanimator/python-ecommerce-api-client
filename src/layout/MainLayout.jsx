const MainLayout = ({children})=>{
  return (
    <>
      <meta charSet="utf-8" />
      <title>Home - Pelotex</title>
      <meta
        name="description"
        content="E-commerce store built with React, Node, Express and Postgres"
      />
      <meta
        name="robots"
        content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <link rel="canonical" href="https://www.pelotex.com/" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="PELOTEX" />
      <meta
        property="og:description"
        content="E-commerce store built with React, Node, Express and Postgres"
      />
      <meta property="og:url" content="https://www.pelotex.com/" />
      <meta property="og:site_name" content="PELOTEX" />
      <meta property="og:image" content="/logo.svg" />
      <meta property="og:image:secure_url" content="/logo.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@badanimator" />
      <meta name="twitter:creator" content="@badanimator" />
      <meta
        name="twitter:description"
        content="E-commerce store built with React, Node, Express and Postgres"
      />
      <meta name="twitter:title" content="PELOTEX" />
      <meta name="twitter:image" content="/logo.svg" />

      <div className="w-full min-h-screen bg-gray-100 pb-10">
        { children }
      </div>
    </>
  )
}

export default MainLayout;