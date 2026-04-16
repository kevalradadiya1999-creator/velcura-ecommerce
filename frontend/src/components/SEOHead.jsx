import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = 'Velcura — Skincare Science Meets Everyday Cleansing',
  description = 'Premium clinical-grade makeup remover wipes with active ingredients. Formulated for Oily, Dry & Sensitive skin. Made in India. Shop Velcura.',
  image = 'https://velcurahygiene.in/og-image.png',
  url,
  type = 'website',
  schema = null,
}) => {
  const canonical = url ? `https://velcurahygiene.in${url}` : 'https://velcurahygiene.in';

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

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
