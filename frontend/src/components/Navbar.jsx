import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlistContext } from '../context/WishlistContext';
import { products } from '../data/products';
import CartDrawer from './CartDrawer';
import AnnouncementBanner from './AnnouncementBanner';

const VelcuraLogo = () => (
  <Link to="/" id="nav-logo" aria-label="Velcura — Home" className="flex items-center no-underline" style={{ textDecoration: 'none' }}>
    <img
      src="/velcura-logo.png"
      alt="Velcura Hygiene Pvt Ltd"
      style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
    />
  </Link>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem('velcura_recent_searches')) || []; } catch { return []; }
  });
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const { count, isOpen, setIsOpen } = useCart();
  const { count: wishlistCount } = useWishlistContext();
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setFocusedIdx(-1);
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase();
    const results = products.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.fullName?.toLowerCase().includes(q) ||
      p.skinType?.toLowerCase().includes(q) ||
      p.keyIngredient?.toLowerCase().includes(q)
    ).slice(0, 5);
    setSearchResults(results);
  }, [searchQuery]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const saveRecentSearch = (term) => {
    const t = term.trim();
    if (!t) return;
    setRecentSearches(prev => {
      const updated = [t, ...prev.filter(x => x !== t)].slice(0, 5);
      localStorage.setItem('velcura_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setFocusedIdx(-1);
  };

  const handleResultClick = (result) => {
    saveRecentSearch(result.name);
    navigate(`/product/${result.slug}`);
    closeSearch();
    setMobileOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/shop', label: 'Shop' },
    { to: '/quiz', label: 'Skin Quiz' },
    { to: '/ingredients', label: 'Ingredients' },
    { to: '/journal', label: 'Journal' },
    { to: '/about', label: 'About' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        id="navbar"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 80,
          transition: 'background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease',
          background: scrolled ? 'rgba(253,251,247,0.95)' : 'rgba(253,251,247,0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(10,25,47,0.08)' : 'none',
        }}
      >
        <AnnouncementBanner />
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'padding 0.3s', paddingTop: scrolled ? '12px' : '20px', paddingBottom: scrolled ? '12px' : '20px' }}>
          <VelcuraLogo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            <nav role="navigation" aria-label="Main navigation" style={{ display: 'flex', gap: '28px', alignItems: 'center', whiteSpace: 'nowrap', minWidth: 'max-content' }}>
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className="nav-link"
                  style={({ isActive }) => ({ color: isActive ? 'var(--accent)' : 'var(--text)', whiteSpace: 'nowrap' })}
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/export" className="btn-primary tracking-[0.1em] shadow-[0_4px_15px_rgba(201,162,74,0.15)]" style={{ padding: '8px 18px', fontSize: '11px', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                Export Inquiry
              </Link>
            </nav>
          </div>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

            {/* Search — full dropdown */}
            <div ref={searchContainerRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="hidden md:flex">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  ref={inputRef}
                  type="search"
                  aria-label="Search products"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { 
                    if (e.key === 'Escape') {
                      closeSearch();
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setFocusedIdx(i => Math.min(i + 1, searchResults.length - 1));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setFocusedIdx(i => Math.max(i - 1, -1));
                    } else if (e.key === 'Enter') {
                      if (focusedIdx >= 0 && searchResults[focusedIdx]) {
                        handleResultClick(searchResults[focusedIdx]);
                      } else if (searchQuery.trim() && searchResults.length > 0) {
                        handleResultClick(searchResults[0]);
                      } else if (searchQuery.trim()) {
                        saveRecentSearch(searchQuery);
                      }
                    }
                  }}
                  style={{
                    width: searchOpen ? '240px' : '0px',
                    opacity: searchOpen ? 1 : 0,
                    border: 'none',
                    borderBottom: '1.5px solid var(--accent)',
                    background: 'transparent',
                    padding: '4px 8px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: 'var(--text)',
                    outline: 'none',
                    transition: 'width 0.3s ease, opacity 0.3s ease',
                    overflow: 'hidden',
                  }}
                />
                <button
                  id="search-btn"
                  aria-label={searchOpen ? 'Close search' : 'Open search'}
                  onClick={searchOpen ? closeSearch : openSearch}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', transition: 'color 0.2s', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                >
                  {searchOpen ? <X size={19} strokeWidth={1.5} /> : <Search size={19} strokeWidth={1.5} />}
                </button>
              </div>

              {/* Recent Searches */}
              {searchOpen && !searchQuery.trim() && recentSearches.length > 0 && (
                <div style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, width: '260px', background: 'white', border: '0.5px solid #eee', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 1000, padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent Searches</p>
                    <button onClick={() => { setRecentSearches([]); localStorage.removeItem('velcura_recent_searches'); }} style={{ background: 'none', border: 'none', fontSize: '11px', color: '#ef4444', cursor: 'pointer' }}>Clear</button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {recentSearches.map(term => (
                      <button key={term} onClick={() => { setSearchQuery(term); inputRef.current?.focus(); }} style={{ background: '#F5F0E8', border: 'none', borderRadius: '999px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter' }}>
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search results dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div role="listbox" style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  width: '300px',
                  background: 'white',
                  border: '0.5px solid #eee',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  zIndex: 1000,
                  overflow: 'hidden',
                }}>
                  {searchResults.map((result, i) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      role="option"
                      aria-selected={focusedIdx === i}
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && handleResultClick(result)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', cursor: 'pointer', transition: 'background 0.15s', background: focusedIdx === i ? '#F9F8F5' : 'white' }}
                      onMouseEnter={() => setFocusedIdx(i)}
                      onMouseLeave={() => setFocusedIdx(-1)}
                    >
                      <img
                        src={result.image}
                        alt={result.fullName}
                        width="40" height="40"
                        style={{ borderRadius: '8px', objectFit: 'cover', background: result.bgColor, flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: 500, color: '#0A192F', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {result.fullName}
                        </p>
                        <p style={{ fontSize: '12px', color: '#9CA3AF' }}>₹{result.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              id="account-btn"
              aria-label="My account"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
              className="hidden md:flex"
            >
              <User size={19} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <Link
              id="wishlist-btn"
              to="/wishlist"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
              className="hidden md:flex"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', position: 'relative', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              <Heart size={19} strokeWidth={1.5} />
              <AnimatePresence mode="popLayout">
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    className="cart-badge"
                    style={{ background: '#ef4444' }}
                    initial={{ opacity: 0, y: 6, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart */}
            <button
              id="cart-btn"
              aria-label={`Shopping cart${count > 0 ? `, ${count} items` : ''}`}
              onClick={() => setIsOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', position: 'relative', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <AnimatePresence mode="popLayout">
                {count > 0 && (
                  <motion.span
                    key={count}
                    className="cart-badge"
                    initial={{ opacity: 0, y: 6, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-btn"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="flex md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer — slides down from Navbar */}
        {mobileOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#FDFBF7', borderTop: '1px solid var(--border)',
            padding: '8px 0 24px',
            boxShadow: '0 8px 30px rgba(10,25,47,0.08)',
            maxHeight: '90vh', overflowY: 'auto',
            animation: 'fadeUp 0.25s ease',
          }}>
            <nav role="navigation" aria-label="Mobile navigation">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily: 'Inter, sans-serif', fontSize: '15px',
                    fontWeight: isActive ? 600 : 500, letterSpacing: '0.06em',
                    color: isActive ? '#0A192F' : 'var(--text)',
                    textDecoration: 'none', textTransform: 'uppercase',
                    padding: '16px 24px', borderBottom: '1px solid rgba(10,25,47,0.05)',
                    display: 'block',
                    borderLeft: isActive ? '3px solid #0A192F' : '3px solid transparent',
                    paddingLeft: isActive ? '21px' : '24px',
                    transition: 'border-color 0.2s, color 0.2s',
                    background: isActive ? 'rgba(10,25,47,0.03)' : 'transparent',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Divider */}
            <div style={{ borderTop: '0.5px solid #eee', margin: '8px 0' }} />

            {/* Cart & Wishlist summary rows */}
            <div style={{ padding: '0 0 8px' }}>
              <button
                onClick={() => { setIsOpen(true); setMobileOpen(false); }}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}
              >
                <span>🛒 Cart</span>
                <span style={{ background: count > 0 ? '#0A192F' : '#F3F4F6', color: count > 0 ? 'white' : '#9CA3AF', borderRadius: '12px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>
                  {count > 0 ? `${count} items` : 'Empty'}
                </span>
              </button>
              <NavLink
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text)', fontWeight: 500, textDecoration: 'none' }}
              >
                <span>♡ Wishlist</span>
                <span style={{ background: wishlistCount > 0 ? '#ef4444' : '#F3F4F6', color: wishlistCount > 0 ? 'white' : '#9CA3AF', borderRadius: '12px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>
                  {wishlistCount > 0 ? `${wishlistCount} items` : 'Empty'}
                </span>
              </NavLink>
            </div>

            {/* Export CTA */}
            <div style={{ padding: '8px 24px 0' }}>
              <Link
                to="/export"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ padding: '14px', fontSize: '13px', textAlign: 'center', display: 'block' }}
              >
                Export Inquiry
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
};

export default Navbar;
