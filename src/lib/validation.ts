import { z } from 'zod';

// Sanitização de strings para prevenir XSS
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

// Validação de CPF brasileiro
const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};

// Formatação de telefone brasileiro
export const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 11) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

// Formatação de CPF
export const formatCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

// Formatação de cartão de crédito
export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
};

// Formatação de validade do cartão
export const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
};

// Schema para checkout de compra
export const checkoutFormSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .transform(sanitizeString),
  email: z.string()
    .email('E-mail inválido')
    .max(255, 'E-mail muito longo')
    .transform(val => val.toLowerCase().trim()),
  phone: z.string()
    .min(14, 'Telefone inválido')
    .max(16, 'Telefone inválido')
    .transform(sanitizeString)
    .optional(),
  cpf: z.string()
    .refine(val => !val || validateCPF(val), 'CPF inválido')
    .transform(sanitizeString)
    .optional(),
  address: z.object({
    cep: z.string().optional(),
    street: z.string().max(200).transform(sanitizeString).optional(),
    number: z.string().max(20).transform(sanitizeString).optional(),
    complement: z.string().max(100).transform(sanitizeString).optional(),
    neighborhood: z.string().max(100).transform(sanitizeString).optional(),
    city: z.string().max(100).transform(sanitizeString).optional(),
    state: z.string().max(2).transform(sanitizeString).optional(),
  }).optional(),
});

export const creditCardSchema = z.object({
  cardNumber: z.string()
    .min(19, 'Número do cartão inválido')
    .max(19, 'Número do cartão inválido'),
  cardName: z.string()
    .min(3, 'Nome no cartão inválido')
    .max(50, 'Nome muito longo')
    .transform(sanitizeString),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Validade inválida'),
  cvv: z.string()
    .min(3, 'CVV inválido')
    .max(4, 'CVV inválido'),
  installments: z.number().min(1).max(12),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
export type CreditCardData = z.infer<typeof creditCardSchema>;
