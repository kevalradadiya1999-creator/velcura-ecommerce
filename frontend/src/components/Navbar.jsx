import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
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

  // Filter products as user types
  useEffect(() => {
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

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultClick = (result) => {
    navigate(`/product/${result.slug}`);
    closeSearch();
    setMobileOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/shop', label: 'Shop' },
    { to: '/ingredients', label: 'Ingredients' },
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
                  onKeyDown={e => { if (e.key === 'Escape') closeSearch(); }}
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

              {/* Search results dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div style={{
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
                  {searchResults.map(result => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && handleResultClick(result)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F9F8F5'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}
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
              {wishlistCount > 0 && (
                <span className="cart-badge" style={{ background: '#ef4444' }}>{wishlistCount}</span>
              )}
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
              {count > 0 && (
                <span className="cart-badge">{count}</span>
              )}
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

        {/* Mobile drawer */}
        {mobileOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#FDFBF7', borderTop: '1px solid var(--border)',
            padding: '8px 0 24px', animation: 'fadeUp 0.3s ease',
            boxShadow: '0 8px 30px rgba(10,25,47,0.08)',
            maxHeight: '90vh', overflowY: 'auto',
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
                    fontWeight: isActive ? 700 : 500, letterSpacing: '0.08em',
                    color: isActive ? 'var(--accent)' : 'var(--text)',
                    textDecoration: 'none', textTransform: 'uppercase',
                    padding: '18px 24px', borderBottom: '1px solid rgba(10,25,47,0.06)',
                    display: 'block',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text)', textDecoration: 'none', textTransform: 'uppercase', padding: '18px 24px', borderBottom: '1px solid rgba(10,25,47,0.06)', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Heart size={15} />
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </NavLink>
            </nav>
            <div style={{ padding: '16px 24px 0' }}>
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
