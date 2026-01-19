// Simple store for managing product checkouts
import { ProductCheckout, defaultProductCheckout } from '@/types/checkout';

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Generate slug from name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Mock data for checkouts per product
const mockCheckouts: ProductCheckout[] = [
  {
    id: 'ck_1',
    productId: 1,
    name: 'Checkout Padrão',
    slug: 'checkout-padrao',
    status: 'active',
    isDefault: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    stats: {
      views: 1245,
      conversions: 89,
      revenue: 17533,
    },
    ...defaultProductCheckout,
    layout: 'two-column',
  },
  {
    id: 'ck_2',
    productId: 1,
    name: 'Checkout Black Friday',
    slug: 'checkout-black-friday',
    status: 'paused',
    isDefault: false,
    createdAt: '2024-01-18T08:00:00Z',
    updatedAt: '2024-01-19T12:00:00Z',
    stats: {
      views: 523,
      conversions: 42,
      revenue: 8274,
    },
    ...defaultProductCheckout,
    layout: 'bold',
    theme: {
      ...defaultProductCheckout.theme,
      primaryColor: '#000000',
      backgroundColor: '#111111',
      textColor: '#ffffff',
    },
  },
  {
    id: 'ck_3',
    productId: 2,
    name: 'Checkout Ebook',
    slug: 'checkout-ebook',
    status: 'active',
    isDefault: true,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-22T11:00:00Z',
    stats: {
      views: 873,
      conversions: 156,
      revenue: 7332,
    },
    ...defaultProductCheckout,
    layout: 'minimal',
  },
];

// Store state
let checkouts = [...mockCheckouts];

// Get all checkouts for a product
export const getCheckoutsByProductId = (productId: number): ProductCheckout[] => {
  return checkouts.filter(c => c.productId === productId);
};

// Get a single checkout by ID
export const getCheckoutById = (checkoutId: string): ProductCheckout | undefined => {
  return checkouts.find(c => c.id === checkoutId);
};

// Get checkout by slug
export const getCheckoutBySlug = (slug: string): ProductCheckout | undefined => {
  return checkouts.find(c => c.slug === slug);
};

// Create a new checkout for a product
export const createCheckout = (productId: number, name: string): ProductCheckout => {
  const newCheckout: ProductCheckout = {
    id: `ck_${generateId()}`,
    productId,
    name,
    slug: `${generateSlug(name)}-${generateId().substring(0, 6)}`,
    status: 'draft',
    isDefault: checkouts.filter(c => c.productId === productId).length === 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stats: {
      views: 0,
      conversions: 0,
      revenue: 0,
    },
    ...defaultProductCheckout,
  };
  
  checkouts = [...checkouts, newCheckout];
  return newCheckout;
};

// Update a checkout
export const updateCheckout = (checkoutId: string, updates: Partial<ProductCheckout>): ProductCheckout | undefined => {
  const index = checkouts.findIndex(c => c.id === checkoutId);
  if (index === -1) return undefined;
  
  checkouts[index] = {
    ...checkouts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  checkouts = [...checkouts];
  return checkouts[index];
};

// Delete a checkout
export const deleteCheckout = (checkoutId: string): boolean => {
  const initialLength = checkouts.length;
  checkouts = checkouts.filter(c => c.id !== checkoutId);
  return checkouts.length < initialLength;
};

// Set a checkout as default for its product
export const setDefaultCheckout = (checkoutId: string): boolean => {
  const checkout = checkouts.find(c => c.id === checkoutId);
  if (!checkout) return false;
  
  checkouts = checkouts.map(c => ({
    ...c,
    isDefault: c.productId === checkout.productId ? c.id === checkoutId : c.isDefault,
  }));
  
  return true;
};

// Duplicate a checkout
export const duplicateCheckout = (checkoutId: string, newName: string): ProductCheckout | undefined => {
  const original = checkouts.find(c => c.id === checkoutId);
  if (!original) return undefined;
  
  const duplicate: ProductCheckout = {
    ...original,
    id: `ck_${generateId()}`,
    name: newName,
    slug: `${generateSlug(newName)}-${generateId().substring(0, 6)}`,
    status: 'draft',
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    stats: {
      views: 0,
      conversions: 0,
      revenue: 0,
    },
  };
  
  checkouts = [...checkouts, duplicate];
  return duplicate;
};
