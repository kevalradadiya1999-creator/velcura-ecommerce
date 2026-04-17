import { useState } from 'react';
import StarRating from './StarRating';
import toast from 'react-hot-toast';

const StarPicker = ({ value, onChange }) => {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '4px', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          style={{ fontSize: '24px', color: s <= (hover || value) ? '#C9A24A' : '#E0E0E0', transition: 'color 0.15s' }}
        >★</span>
      ))}
    </div>
  );
};

const ReviewsSection = ({ reviews: initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [formOpen, setFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, title: '', body: '' });
  const [submitting, setSubmitting] = useState(false);

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
  const total = reviews.length;

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => Math.round(r.rating) === star).length,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.body.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const review = {
        id: Date.now().toString(),
        ...newReview,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        verified: false,
      };
      setReviews(prev => [review, ...prev]);
      setNewReview({ author: '', rating: 5, title: '', body: '' });
      setFormOpen(false);
      setSubmitting(false);
      toast.success('Review submitted! Thank you.');
    }, 900);
  };

  return (
    <section style={{ padding: '80px 32px', background: 'white', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', marginBottom: '48px' }}>
          {/* Left: average */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '120px' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '64px', fontWeight: 600, color: '#0A192F', lineHeight: 1 }}>{avg}</p>
            <StarRating rating={Number(avg)} count={total} size={18} />
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>{total} review{total !== 1 ? 's' : ''}</p>
          </div>

          {/* Right: bar chart */}
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ratingCounts.map(({ star, count }) => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#6B7280', width: '16px', textAlign: 'right', flexShrink: 0 }}>{star}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#C9A24A" />
                </svg>
                <div style={{ flex: 1, height: '6px', background: '#F0F0F0', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: total > 0 ? `${(count / total) * 100}%` : '0%', background: '#C9A24A', borderRadius: '999px', transition: 'width 0.6s ease' }} />
                </div>
                <span style={{ fontSize: '11px', color: '#9CA3AF', width: '20px', flexShrink: 0 }}>{count}</span>
              </div>
            ))}
          </div>

          {/* Write review button */}
          <button
            onClick={() => setFormOpen(v => !v)}
            style={{ background: 'none', border: '1.5px solid #0A192F', borderRadius: '4px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
          >
            {formOpen ? 'Cancel' : '✏️ Write a Review'}
          </button>
        </div>

        {/* Review form */}
        <div style={{ maxHeight: formOpen ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease', marginBottom: formOpen ? '40px' : 0 }}>
          <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border)' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#0A192F' }}>Share Your Experience</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Your Rating</label>
              <StarPicker value={newReview.rating} onChange={r => setNewReview(v => ({ ...v, rating: r }))} />
            </div>
            <input required placeholder="Your name" value={newReview.author} onChange={e => setNewReview(v => ({ ...v, author: e.target.value }))}
              style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
            <input placeholder="Review title (optional)" value={newReview.title} onChange={e => setNewReview(v => ({ ...v, title: e.target.value }))}
              style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
            <textarea required placeholder="Share your experience with this product..." value={newReview.body}
              onChange={e => setNewReview(v => ({ ...v, body: e.target.value }))}
              rows={4} style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'vertical' }} />
            <button type="submit" disabled={submitting}
              style={{ background: '#0A192F', color: 'white', border: 'none', borderRadius: '4px', padding: '12px 24px', fontSize: '13px', fontWeight: 700, cursor: submitting ? 'wait' : 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em', alignSelf: 'flex-start', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* Review list */}
        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
            <p style={{ fontSize: '15px', marginBottom: '8px' }}>No reviews yet.</p>
            <p style={{ fontSize: '13px' }}>Be the first to share your experience!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {reviews.map((r, idx) => (
              <div key={r.id} style={{ padding: '24px 0', borderBottom: idx < reviews.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A192F', marginBottom: '4px' }}>{r.author}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <StarRating rating={r.rating} size={13} />
                      {r.verified && (
                        <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>✓ Verified Purchase</span>
                      )}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9CA3AF', flexShrink: 0 }}>{r.date}</span>
                </div>
                {r.title && (
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#0A192F', marginBottom: '6px' }}>{r.title}</p>
                )}
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.7' }}>{r.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
