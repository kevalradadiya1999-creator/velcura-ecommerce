import { useParams, Link, Navigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from './Blog';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/journal" />;
  }

  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div style={{ background: '#FDFBF7', minHeight: '100vh', paddingBottom: '100px' }}>
      <SEOHead title={`${post.title} | Velcura Journal`} />
      
      <div style={{ width: '100%', height: '50vh', position: 'relative' }}>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(10,25,47,0.8))' }} />
        <div className="container" style={{ position: 'absolute', bottom: '40px', left: '0', right: '0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/journal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.8)', fontSize: '13px', textDecoration: 'none', marginBottom: '24px' }}>
              <ArrowLeft size={16} /> Back to Journal
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
              <span style={{ background: 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '999px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 48px)', color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
              {post.title}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>By {post.author}</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '800px', paddingTop: '60px' }}>
        <div className="blog-content" style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '24px', fontSize: '18px', color: '#0A192F', fontWeight: 500 }}>
            {post.excerpt}
          </p>
          <p style={{ marginBottom: '24px' }}>
            When discussing barrier health, active ingredients and moisture retention are invariably at the forefront. At Velcura, we believe that understanding the fundamental building blocks of your skin’s outermost layer—the stratum corneum—is the first step toward achieving a truly balanced complexion. Your skin barrier acts not only as a shield against environmental stressors but also as a seal that prevents transepidermal water loss (TEWL). When this structure is compromised, your skin is prone to irritation, rapid moisture loss, and an overproduction of sebum.
          </p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#0A192F', marginTop: '40px', marginBottom: '16px' }}>
            The Clinical Perspective
          </h3>
          <p style={{ marginBottom: '24px' }}>
            Dermatological research continues to validate the fact that supporting the lipid matrix requires a targeted approach. Introducing ceramides, hyaluronic acid, and proper cleansing into your regimen helps to bridge the gaps in an impaired barrier. By using clinically tested, gentle cleansing methods—like those integrated into our formulated wipes—you allow essential lipids to remain intact. Stripping the skin of these natural oils leads to a paradoxical effect where dehydration triggers more oil production.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Our meticulously engineered formulations are designed with this physiology in mind. They don't just cleanse; they actively work to limit inflammation, regulate sebaceous output, and promote natural synthesis. We recommend paying close attention to how your skin feels post-cleanse—if it's tight or "squeaky," you are likely deteriorating your barrier. True clinical hygiene should leave the skin calm, plump, and deeply fortified.
          </p>
          <blockquote style={{ borderLeft: '4px solid #C9A24A', paddingLeft: '20px', fontStyle: 'italic', fontSize: '18px', color: '#0A192F', margin: '40px 0' }}>
            "Understanding how ingredients interact with your lipid barrier is the difference between surviving your routine and thriving in it."
          </blockquote>
          <p style={{ marginBottom: '24px' }}>
            In conclusion, whether you are dealing with oily, dry, or sensitive skin, the goal should always be to maintain an intact, healthy barrier. By understanding the science behind your skincare, you empower yourself to make choices that lead to long-term resilience and radiance.
          </p>
        </div>

        <div style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid #eee' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#0A192F', marginBottom: '32px' }}>
            More from the Journal
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
            {otherPosts.map(p => (
              <Link key={p.id} to={`/journal/${p.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                <img 
                  src={p.coverImage} 
                  alt={p.title} 
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'; }}
                />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#C9A24A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  {p.category}
                </span>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#0A192F', lineHeight: 1.3 }}>
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
