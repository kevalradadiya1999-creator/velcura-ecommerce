import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import AnnouncementBanner from './AnnouncementBanner';

const VelcuraLogo = () => (
  <Link to="/" id="nav-logo" className="flex items-center no-underline" style={{ textDecoration: 'none' }}>
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
  const { count, isOpen, setIsOpen } = useCart();
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

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
          top: 0,
          left: 0,
          right: 0,
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

          {/* Desktop Nav — horizontally scrollable on mid screens */}
          <div className="hidden md:flex items-center" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            <nav style={{ display: 'flex', gap: '28px', alignItems: 'center', whiteSpace: 'nowrap', minWidth: 'max-content' }}>
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--accent)' : 'var(--text)',
                    whiteSpace: 'nowrap',
                  })}
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
            {/* Search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="hidden md:flex">
              {searchOpen && (
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search products..."
                  onBlur={() => setSearchOpen(false)}
                  style={{
                    position: 'absolute',
                    right: '28px',
                    width: '200px',
                    border: 'none',
                    borderBottom: '1.5px solid var(--accent)',
                    background: 'transparent',
                    padding: '4px 8px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: 'var(--text)',
                    outline: 'none',
                  }}
                />
              )}
              <button
                id="search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
              >
                <Search size={19} strokeWidth={1.5} />
              </button>
            </div>

            <button
              id="account-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
              className="hidden md:flex"
            >
              <User size={19} strokeWidth={1.5} />
            </button>

            {/* Cart */}
            <button
              id="cart-btn"
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

            {/* Mobile menu */}
            <button
              id="mobile-menu-btn"
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
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FDFBF7',
            borderTop: '1px solid var(--border)',
            padding: '8px 0 24px',
            animation: 'fadeUp 0.3s ease',
            boxShadow: '0 8px 30px rgba(10,25,47,0.08)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.08em',
                    color: isActive ? 'var(--accent)' : 'var(--text)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    padding: '18px 24px',
                    borderBottom: '1px solid rgba(10,25,47,0.06)',
                    display: 'block',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
            <div style={{ padding: '0 24px' }}>
              <Link
                to="/export"
                onClick={() => setMobileOpen(false)}
                className="btn-primary justify-center tracking-[0.1em] w-full block"
                style={{ padding: '14px', fontSize: '13px', textAlign: 'center', display: 'block' }}
              >
                Export Inquiry
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer />

      {/* Toast */}
    </>
  );
};

export default Navbar;
