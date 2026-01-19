// Types for the checkout system

export interface CheckoutTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  buttonStyle: 'solid' | 'gradient' | 'outline';
}

export interface CheckoutHeader {
  showLogo: boolean;
  logo: string | null;
  showTitle: boolean;
  title: string;
  showSubtitle: boolean;
  subtitle: string;
  showBadge: boolean;
  badgeText: string;
}

export interface CheckoutProduct {
  showImage: boolean;
  imagePosition: 'left' | 'top' | 'right';
  showPrice: boolean;
  showOriginalPrice: boolean;
  originalPrice: number;
  showDiscount: boolean;
  discountPercentage: number;
  showRating: boolean;
  showSalesCount: boolean;
}

export interface CheckoutTimer {
  enabled: boolean;
  type: 'countdown' | 'evergreen';
  hours: number;
  minutes: number;
  text: string;
  showProgress: boolean;
}

export interface CheckoutGuarantee {
  enabled: boolean;
  days: number;
  title: string;
  description: string;
  iconType: 'shield' | 'medal' | 'check' | 'star';
}

export interface CheckoutTestimonial {
  id: string;
  name: string;
  avatar: string | null;
  rating: number;
  text: string;
  enabled: boolean;
}

export interface CheckoutBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface CheckoutPaymentMethods {
  creditCard: boolean;
  pix: boolean;
  boleto: boolean;
  twoCards: boolean;
}

export interface CheckoutInstallments {
  enabled: boolean;
  maxInstallments: number;
  interestFreeInstallments: number;
}

export interface CheckoutFields {
  name: boolean;
  email: boolean;
  phone: boolean;
  cpf: boolean;
  address: boolean;
  birthDate: boolean;
  customFields: Array<{
    id: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'checkbox';
    required: boolean;
    options?: string[];
  }>;
}

export interface CheckoutUpsell {
  enabled: boolean;
  productId: string | null;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string | null;
  position: 'before_payment' | 'after_payment' | 'popup';
}

export interface CheckoutOrderBump {
  id: string;
  enabled: boolean;
  productId: string | null;
  title: string;
  description: string;
  price: number;
  image: string | null;
  callToAction: string;
  highlight: boolean;
}

export interface CheckoutPixel {
  facebookPixel: string;
  googleAds: string;
  googleAnalytics: string;
  tiktokPixel: string;
  customScripts: string;
}

export interface CheckoutSecurity {
  showSecurityBadges: boolean;
  showSSL: boolean;
  showPaymentIcons: boolean;
  customSecurityText: string;
}

export interface CheckoutFooter {
  showTerms: boolean;
  termsLink: string;
  showPrivacy: boolean;
  privacyLink: string;
  showSupport: boolean;
  supportEmail: string;
  showBranding: boolean;
}

export interface ProductCheckout {
  id: string;
  productId: number;
  name: string;
  slug: string;
  status: 'active' | 'paused' | 'draft';
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  stats: {
    views: number;
    conversions: number;
    revenue: number;
  };
  
  // Layout
  layout: 'one-column' | 'two-column' | 'modern' | 'minimal' | 'bold';
  
  // Theme
  theme: CheckoutTheme;
  
  // Header
  header: CheckoutHeader;
  
  // Product display
  product: CheckoutProduct;
  
  // Timer/Urgency
  timer: CheckoutTimer;
  
  // Guarantee
  guarantee: CheckoutGuarantee;
  
  // Testimonials
  testimonials: CheckoutTestimonial[];
  
  // Benefits
  benefits: CheckoutBenefit[];
  
  // Payment
  paymentMethods: CheckoutPaymentMethods;
  installments: CheckoutInstallments;
  
  // Form fields
  fields: CheckoutFields;
  
  // Upsell
  upsell: CheckoutUpsell;
  
  // Order bumps
  orderBumps: CheckoutOrderBump[];
  
  // Pixels & tracking
  pixels: CheckoutPixel;
  
  // Security
  security: CheckoutSecurity;
  
  // Footer
  footer: CheckoutFooter;
}

export const defaultCheckoutTheme: CheckoutTheme = {
  primaryColor: '#7c3aed',
  secondaryColor: '#a855f7',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  fontFamily: 'Inter',
  borderRadius: 'lg',
  buttonStyle: 'gradient',
};

export const defaultProductCheckout: Omit<ProductCheckout, 'id' | 'productId' | 'name' | 'slug' | 'createdAt' | 'updatedAt'> = {
  status: 'draft',
  isDefault: false,
  stats: {
    views: 0,
    conversions: 0,
    revenue: 0,
  },
  layout: 'two-column',
  theme: defaultCheckoutTheme,
  header: {
    showLogo: true,
    logo: null,
    showTitle: true,
    title: 'Complete sua compra',
    showSubtitle: true,
    subtitle: 'Preencha os dados abaixo para finalizar',
    showBadge: true,
    badgeText: '🔥 Oferta especial',
  },
  product: {
    showImage: true,
    imagePosition: 'left',
    showPrice: true,
    showOriginalPrice: true,
    originalPrice: 0,
    showDiscount: true,
    discountPercentage: 0,
    showRating: true,
    showSalesCount: true,
  },
  timer: {
    enabled: true,
    type: 'countdown',
    hours: 0,
    minutes: 15,
    text: 'Oferta expira em:',
    showProgress: true,
  },
  guarantee: {
    enabled: true,
    days: 7,
    title: 'Garantia incondicional',
    description: 'Se não gostar, devolvemos 100% do seu dinheiro',
    iconType: 'shield',
  },
  testimonials: [],
  benefits: [
    {
      id: '1',
      icon: 'zap',
      title: 'Acesso imediato',
      description: 'Comece agora mesmo após a confirmação',
      enabled: true,
    },
    {
      id: '2',
      icon: 'headphones',
      title: 'Suporte exclusivo',
      description: 'Tire suas dúvidas com nossa equipe',
      enabled: true,
    },
    {
      id: '3',
      icon: 'shield',
      title: 'Compra segura',
      description: 'Seus dados estão protegidos',
      enabled: true,
    },
  ],
  paymentMethods: {
    creditCard: true,
    pix: true,
    boleto: true,
    twoCards: false,
  },
  installments: {
    enabled: true,
    maxInstallments: 12,
    interestFreeInstallments: 3,
  },
  fields: {
    name: true,
    email: true,
    phone: true,
    cpf: true,
    address: false,
    birthDate: false,
    customFields: [],
  },
  upsell: {
    enabled: false,
    productId: null,
    title: 'Aproveite esta oferta exclusiva!',
    description: 'Adicione este bônus especial ao seu pedido',
    price: 47,
    originalPrice: 97,
    image: null,
    position: 'before_payment',
  },
  orderBumps: [],
  pixels: {
    facebookPixel: '',
    googleAds: '',
    googleAnalytics: '',
    tiktokPixel: '',
    customScripts: '',
  },
  security: {
    showSecurityBadges: true,
    showSSL: true,
    showPaymentIcons: true,
    customSecurityText: 'Ambiente 100% seguro',
  },
  footer: {
    showTerms: true,
    termsLink: '/termos',
    showPrivacy: true,
    privacyLink: '/privacidade',
    showSupport: true,
    supportEmail: 'suporte@exemplo.com',
    showBranding: false,
  },
};
