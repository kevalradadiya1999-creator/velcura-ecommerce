import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { ArrowRight } from 'lucide-react';

export const blogPosts = [
  {
    id: 1,
    slug: 'science-of-ceramides',
    title: 'The Science of Ceramides: Why Your Skin Barrier Needs Them',
    excerpt: 'Discover why ceramides are the most important lipids in your skincare routine and how they prevent transepidermal water loss.',
    category: 'Skincare Science',
    readTime: '4 min read',
    date: 'Oct 12, 2024',
    coverImage: 'https://images.unsplash.com/photo-1615397323719-54d92410a7db?w=800&q=80&fit=crop',
    author: 'Dr. Sarah Chen'
  },
  {
    id: 2,
    slug: 'double-cleansing-myth-vs-fact',
    title: 'Double Cleansing: Myth vs. Fact',
    excerpt: 'Is double cleansing really necessary for everyone? We break down the science behind this popular routine and when to use it.',
    category: 'Routines',
    readTime: '3 min read',
    date: 'Sep 28, 2024',
    coverImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80&fit=crop',
    author: 'Velcura Editorial Team'
  },
  {
    id: 3,
    slug: 'salicylic-acid-for-breakouts',
    title: 'How Salicylic Acid Transforms Acne-Prone Skin',
    excerpt: 'A deep dive into beta-hydroxy acids, how they penetrate oil, and why they are the gold standard for clearing pores.',
    category: 'Ingredients',
    readTime: '5 min read',
    date: 'Sep 15, 2024',
    coverImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80&fit=crop',
    author: 'Jessica Rivera, Esthetician'
  },
  {
    id: 4,
    slug: 'morning-vs-night-routines',
    title: 'Morning vs Night: Adjusting Your Routine',
    excerpt: 'Your skin has different needs depending on the time of day. Learn how to sequence your products for maximum efficacy.',
    category: 'Lifestyle',
    readTime: '6 min read',
    date: 'Aug 30, 2024',
    coverImage: 'https://images.unsplash.com/photo-1512496015851-a1c8ef2dd676?w=800&q=80&fit=crop',
    author: 'Velcura Editorial Team'
  }
];

const Blog = () => {
  return (
    <div style={{ padding: '80px 20px', background: '#FDFBF7', minHeight: '100vh' }}>
      <SEOHead title="Journal | Velcura" />
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', color: '#0A192F', marginBottom: '16px' }}>
            The Velcura Journal
          </h1>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Skincare science, routines, and real talk.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {blogPosts.map(post => (
            <Link key={post.id} to={`/journal/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div 
                style={{ 
                  background: 'white', 
                  borderRadius: '16px', 
                  border: '1px solid #eee', 
                  overflow: 'hidden', 
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'; }}
                />
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#C9A24A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                    {post.category}
                  </span>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#0A192F', marginBottom: '12px', lineHeight: 1.3 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#9CA3AF' }}>
                    <span>{post.author}</span>
                    <span>{post.date} • {post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
