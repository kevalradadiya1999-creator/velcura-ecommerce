const SkeletonCard = () => (
  <div style={{
    borderRadius: '16px',
    overflow: 'hidden',
    background: '#fff',
    border: '1px solid rgba(10,25,47,0.06)',
  }}>
    <style>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .skeleton-shimmer {
        background: linear-gradient(90deg, #f0ece4 25%, #e8e4dc 50%, #f0ece4 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
    `}</style>

    {/* Image area */}
    <div className="skeleton-shimmer" style={{ height: '260px', width: '100%' }} />

    {/* Content area */}
    <div style={{ padding: '20px' }}>
      {/* Badge */}
      <div className="skeleton-shimmer" style={{ height: '20px', width: '80px', borderRadius: '4px', marginBottom: '12px' }} />
      {/* Title */}
      <div className="skeleton-shimmer" style={{ height: '24px', width: '60%', borderRadius: '4px', marginBottom: '8px' }} />
      {/* Subtitle */}
      <div className="skeleton-shimmer" style={{ height: '16px', width: '80%', borderRadius: '4px', marginBottom: '16px' }} />
      {/* Bullets */}
      <div className="skeleton-shimmer" style={{ height: '14px', width: '90%', borderRadius: '4px', marginBottom: '6px' }} />
      <div className="skeleton-shimmer" style={{ height: '14px', width: '75%', borderRadius: '4px', marginBottom: '6px' }} />
      <div className="skeleton-shimmer" style={{ height: '14px', width: '85%', borderRadius: '4px', marginBottom: '20px' }} />
      {/* Price + button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="skeleton-shimmer" style={{ height: '28px', width: '60px', borderRadius: '4px' }} />
        <div className="skeleton-shimmer" style={{ height: '44px', width: '120px', borderRadius: '4px' }} />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  }}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
