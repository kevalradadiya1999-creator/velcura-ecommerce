const StarRating = ({ rating, count, size = 14 }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {stars.map(s => {
          const filled = rating >= s;
          const half = !filled && rating >= s - 0.5;
          const gradId = `half-${s}-${Math.random().toString(36).slice(2, 5)}`;
          return (
            <svg key={s} width={size} height={size} viewBox="0 0 24 24">
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="#C9A24A" />
                  <stop offset="50%" stopColor="#E0E0E0" />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={filled ? '#C9A24A' : half ? `url(#${gradId})` : '#E0E0E0'}
              />
            </svg>
          );
        })}
      </div>
      {count != null && (
        <span style={{ fontSize: size - 2, color: '#888', fontFamily: 'Inter, sans-serif' }}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default StarRating;
