import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('velcura_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('velcura_compare', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    if (compareList.length >= 3) {
      toast.error('You can compare up to 3 products');
      return;
    }
    if (compareList.some(p => p.id === product.id)) return;
    setCompareList([...compareList, product]);
    toast.success('Added to comparison');
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter(p => p.id !== id));
  };

  const isInCompare = (id) => compareList.some(p => p.id === id);

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
