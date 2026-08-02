import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { EnquiryItem } from '@/types';

interface EnquiryContextValue {
  items: EnquiryItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<EnquiryItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const EnquiryContext = createContext<EnquiryContextValue | undefined>(undefined);

const makeId = (p: string, s: string, v: string) => `${p}__${s}__${v}`;

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<EnquiryItem, 'id'>) => {
    setItems((prev) => {
      const id = makeId(item.productName, item.size, item.variant);
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, { ...item, id }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <EnquiryContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
}
