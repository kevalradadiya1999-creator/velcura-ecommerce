import { useState, useMemo } from 'react';
import SEOHead from '../components/SEOHead';
import { Search } from 'lucide-react';

const ingredientsData = [
  { name: 'Salicylic Acid', category: 'Exfoliant', benefit: 'Clears pores & reduces breakouts', safetyRating: 'safe', commonIn: ['Oil Balance Wipes'] },
  { name: 'Niacinamide', category: 'Vitamin', benefit: 'Regulates oil & brightens tone', safetyRating: 'safe', commonIn: ['Oil Balance Wipes', 'Serum'] },
  { name: 'Hyaluronic Acid', category: 'Humectant', benefit: 'Deeply hydrates & plumps', safetyRating: 'safe', commonIn: ['HydraGlow Wipes'] },
  { name: 'Glycerin', category: 'Humectant', benefit: 'Draws moisture into the skin', safetyRating: 'safe', commonIn: ['HydraGlow Wipes', 'Calm Barrier Wipes'] },
  { name: 'Zinc PCA', category: 'Mineral', benefit: 'Controls sebum & soothes acne', safetyRating: 'safe', commonIn: ['Oil Balance Wipes'] },
  { name: 'Aloe Vera', category: 'Soothing', benefit: 'Calms irritation & hydrates', safetyRating: 'safe', commonIn: ['Calm Barrier Wipes'] },
  { name: 'Green Tea Extract', category: 'Antioxidant', benefit: 'Protects against environmental stressors', safetyRating: 'safe', commonIn: ['Oil Balance Wipes'] },
  { name: 'Vitamin C', category: 'Antioxidant', benefit: 'Brightens skin & boosts collagen', safetyRating: 'caution', commonIn: ['Day Serum'] },
  { name: 'Retinol', category: 'Anti-aging', benefit: 'Speeds cellular turnover', safetyRating: 'caution', commonIn: ['Night Cream'] },
  { name: 'Ceramides', category: 'Lipid', benefit: 'Restores skin barrier function', safetyRating: 'safe', commonIn: ['Calm Barrier Wipes'] },
  { name: 'Centella Asiatica', category: 'Soothing', benefit: 'Heals & reduces inflammation', safetyRating: 'safe', commonIn: ['Calm Barrier Wipes'] },
  { name: 'Panthenol', category: 'Vitamin', benefit: 'Soothes & repairs skin barrier', safetyRating: 'safe', commonIn: ['HydraGlow Wipes', 'Calm Barrier Wipes'] },
  { name: 'Lactic Acid', category: 'Exfoliant', benefit: 'Gently exfoliates & hydrates', safetyRating: 'caution', commonIn: ['Resurfacing Pads'] },
  { name: 'Kojic Acid', category: 'Brightening', benefit: 'Fades hyperpigmentation', safetyRating: 'caution', commonIn: ['Dark Spot Corrector'] },
  { name: 'Squalane', category: 'Emollient', benefit: 'Locks in moisture without clogging', safetyRating: 'safe', commonIn: ['HydraGlow Wipes', 'Moisturizer'] },
];

const Ingredients = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return ingredientsData.filter(i => 
      i.name.toLowerCase().includes(search.toLowerCase()) || 
      i.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Group by category
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered]);

  return (
    <div style={{ padding: '80px 20px', background: '#FDFBF7', minHeight: '100vh' }}>
      <SEOHead title="Ingredient Glossary | Velcura" />
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', color: '#0A192F', marginBottom: '16px' }}>
            Ingredient Glossary
          </h1>
          <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
            We believe in full transparency. Here's exactly what goes into our products.
          </p>
        </div>

        <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto 40px' }}>
          <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search ingredients or categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 44px',
              borderRadius: '999px',
              border: '1px solid #eee',
              outline: 'none',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
          />
        </div>

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A192F', marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '8px', position: 'sticky', top: '80px', background: '#FDFBF7', zIndex: 10 }}>
              {category}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {items.map(ing => (
                <div key={ing.name} style={{ borderRadius: '12px', border: '0.5px solid #eee', padding: '16px 20px', background: 'white', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0A192F', margin: 0 }}>{ing.name}</h3>
                    <div title={ing.safetyRating === 'safe' ? "Safe for daily use" : "Use with caution / Follow directions"} style={{ width: '10px', height: '10px', borderRadius: '50%', background: ing.safetyRating === 'safe' ? '#22c55e' : '#eab308' }} />
                  </div>
                  <div style={{ display: 'inline-block', padding: '2px 8px', background: '#F5F0E8', color: '#92400E', fontSize: '10px', borderRadius: '999px', alignSelf: 'flex-start', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700 }}>
                    {ing.category}
                  </div>
                  <p style={{ fontSize: '13px', color: '#6B7280', flex: 1, marginBottom: '16px' }}>{ing.benefit}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {ing.commonIn.map(prod => (
                      <span key={prod} style={{ background: '#f3f4f6', color: '#4b5563', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(grouped).length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9CA3AF' }}>
            No ingredients found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Ingredients;
