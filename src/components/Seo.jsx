import React from "react";
import { Helmet } from "react-helmet";

// Reusable SEO helper to keep page metadata consistent across the app.
const Seo = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  url,
}) => {
  const pageTitle = title
    ? `${title} | Dawaa Alhayat`
    : "Dawaa Alhayat - Buy Medical Products Online";
  const canonicalUrl = url || window.location.href;
  const metaDescription =
    description ||
    "Dawaa Alhayat offers a wide range of medical products. Shop online with us for quality and affordable healthcare products.";

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {image ? <meta name="twitter:image" content={image} /> : null}
    </Helmet>
  );
};

export default Seo;
