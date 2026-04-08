import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const Ingredients = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const science = [
    {
      id: 'niacinamide',
      name: 'Niacinamide',
      subtitle: 'Vitamin B3',
      concentration: '4.00% w/w',
      useCase: 'Sebum regulation & pore refinement',
      product: products[0],
      what: "Niacinamide (nicotinamide) is an active, water-soluble form of Vitamin B3. Our formulation uses a clinical concentration of 4% to target oil production at the source.",
      results: [
        'Significant sebum reduction in 4 weeks',
        'Refined pore texture',
        'Stronger barrier'
      ],
    },
    {
      id: 'salicylic-acid',
      name: 'Salicylic Acid',
      subtitle: 'BHA (Beta Hydroxy Acid)',
      concentration: '1.00% w/w',
      useCase: 'Deep pore exfoliation & acne control',
      product: products[0],
      what: "A lipophilic acid that penetrates through surface oil to exfoliate inside the pore lining. Essential for acne-prone skin profiles.",
      results: [
        'Reduced comedones',
        'Decreased acne lesions',
        'Smoother skin texture'
      ],
    },
    {
      id: 'hyaluronic-acid',
      name: 'Sodium Hyaluronate',
      subtitle: 'Hyaluronic Acid Salt',
      concentration: '1.00% w/w',
      useCase: 'Deep epidermal hydration',
      product: products[1],
      what: "Top-tier humectant holding 1000x its weight in water. Replenishing it topically is a cornerstone of our dry skin strategy.",
      results: [
        'Immediate plumpness',
        'Relief from tightness',
        'Long-lasting hydration'
      ],
    },
    {
      id: 'ceramide-complex',
      name: 'Ceramide Complex',
      subtitle: 'NP + AP + EOP',
      concentration: '2.50% w/w',
      useCase: 'Lipid barrier reconstruction',
      product: products[1],
      what: "Ceramides are lipid molecules that make up 50% of your skin's composition. Our complex mimics the natural lipid matrix.",
      results: [
        'Reduced skin reactivity',
        'Protection against TEWL',
        'Optimized lipid barrier'
      ],
    },
    {
      id: 'centella',
      name: 'Centella Asiatica',
      subtitle: 'Cica Extract',
      concentration: '3.00% w/w',
      useCase: 'Soothing & inflammation reduction',
      product: products[2],
      what: "A clinically renowned botanical extract rich in triterpenoids, proven to accelerate skin healing and dramatically lower redness.",
      results: [
        'Visible redness reduction',
        'Calmed reactive skin',
        'Boosted collagen synthesis'
      ],
    },
    {
      id: 'glycerin',
      name: 'Glycerin',
      subtitle: 'Pharmaceutical Grade',
      concentration: '5.00% w/w',
      useCase: 'Base hydration matrix',
      product: products[3], // Combination
      what: "The biological gold-standard humectant. Highly effective at maintaining moisture balance in combination skin typologies.",
      results: [
        'Balanced hydration',
        'Non-comedogenic moisture',
        'Smooth application'
      ],
    }
  ];

  return (
    <div className="pb-20 lg:pb-32 bg-[#FDFBF7] min-h-screen">
      {/* Header */}
      <section className="bg-[#0A192F] py-20 lg:py-32 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,162,74,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="container relative z-10">
          <span className="text-[12px] uppercase tracking-[0.25em] text-[#C9A24A] font-semibold mb-4 block">Formulation Directory</span>
          <h1 className="font-playfair text-[40px] md:text-[56px] lg:text-[64px] font-semibold text-white mb-6 leading-tight">
            The Formulation Matrix
          </h1>
          <p className="font-inter text-[16px] lg:text-[18px] text-white/70 max-w-[600px] mx-auto leading-relaxed">
            Strict transparency. Below is our clinical ingredient glossary, detailing active concentrations and specific biological use cases.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="container mt-[-40px] lg:mt-[-60px] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {science.map((ing) => (
            <div key={ing.id} className="bg-white rounded-[20px] p-8 lg:p-10 border border-[rgba(10,25,47,0.06)] shadow-[0_20px_40px_rgba(10,25,47,0.03)] flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-playfair text-[24px] font-semibold text-[#0A192F] mb-1">{ing.name}</h3>
                  <span className="text-[11px] uppercase tracking-widest text-[#0A192F]/50 font-bold">{ing.subtitle}</span>
                </div>
                <div className="bg-[#FDFBF7] border border-[#C9A24A]/20 px-3 py-1.5 rounded-lg">
                  <span className="text-[12px] font-bold text-[#C9A24A]">{ing.concentration}</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-widest text-[#C9A24A] font-bold block mb-2">Clinical Target</span>
                <p className="font-inter text-[15px] font-medium text-[#0A192F]">{ing.useCase}</p>
              </div>

              <div className="mb-8 flex-1">
                <p className="font-inter text-[14px] text-[#0A192F]/70 leading-relaxed">
                  {ing.what}
                </p>
              </div>

              <div className="pt-6 border-t border-[rgba(10,25,47,0.06)] mb-6">
                <ul className="space-y-3">
                  {ing.results.map((res, i) => (
                    <li key={i} className="flex items-start gap-2">
                       <span className="text-[#C9A24A] text-[14px]">✦</span>
                       <span className="font-inter text-[13px] text-[#0A192F]/80 leading-snug">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={`/product/${ing.product.slug}`} className="mt-auto group flex items-center justify-between p-4 bg-[#FDFBF7] rounded-xl hover:bg-[#0A192F] transition-colors duration-300">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-[#0A192F]/50 font-bold group-hover:text-white/50 transition-colors">Found In</span>
                    <span className="font-playfair text-[15px] font-semibold text-[#0A192F] group-hover:text-white transition-colors">{ing.product.name}</span>
                 </div>
                 <div className="w-8 h-8 rounded-full border border-[#0A192F]/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                    <span className="text-[#0A192F] group-hover:text-white text-[16px] leading-none mb-[2px]">→</span>
                 </div>
              </Link>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Ingredients;
