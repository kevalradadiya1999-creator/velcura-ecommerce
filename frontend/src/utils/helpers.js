export const formatPrice = (price) => `₹${Number(price).toLocaleString('en-IN')}`;
export const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
export const truncate = (str, n) => str?.length > n ? str.slice(0, n) + '...' : str;
export const generateOrderId = () => `VLC-${Math.floor(Math.random() * 90000 + 10000)}`;
export const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const calculateDiscount = (original, discounted) => Math.round(((original - discounted) / original) * 100);
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
