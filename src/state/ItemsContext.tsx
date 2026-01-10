import { createContext } from 'react';
import type { ItemCardData } from '../types.ts';

interface ItemCardContextType {
  items: ItemCardData[];
  setItems: (values: ItemCardData[]) => void;
  deleteItem: (value: ItemCardData) => void;
}

export const ItemsProviderContext = createContext<ItemCardContextType | undefined>(undefined);
