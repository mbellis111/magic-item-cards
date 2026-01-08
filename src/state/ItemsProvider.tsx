import { type PropsWithChildren, useState } from 'react';
import { ItemsProviderContext } from './ItemsContext.tsx';
import type { ItemCardData } from '../types.ts';

export const ItemsContext = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<ItemCardData[]>([]);

  return (
    <ItemsProviderContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsProviderContext.Provider>
  );
};
