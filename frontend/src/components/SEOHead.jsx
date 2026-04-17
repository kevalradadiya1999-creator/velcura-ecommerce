import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { config } from '../utils/config';

const SEOHead = ({
  title = 'Velcura — Skincare Science Meets Everyday Cleansing',
  description = 'Premium clinical-grade makeup remover wipes with active ingredients. Formulated for Oily, Dry & Sensitive skin. Made in India. Shop Velcura.',
  image = config.defaultMetaImage,
  type = 'website',
  schema = null,
}) => {
  const { pathname } = useLocation();
  const canonical = `${config.siteUrl}${pathname}`;
  const isHome = pathname === '/';
  const isProduct = pathname.startsWith('/product/');

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Velcura Hygiene",
    "url": config.siteUrl,
    "logo": `${config.siteUrl}/logo.png`,
    "sameAs": [config.instagram],
    "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": "English" }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": config.siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${config.siteUrl}/shop?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Velcura Hygiene" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@velcurahygiene" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Product JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}

      {/* Organization Schema (all non-product pages) */}
      {!isProduct && (
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      )}

      {/* WebSite Schema (Home page only) */}
      {isHome && (
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
