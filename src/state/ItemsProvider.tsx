import { type PropsWithChildren, useState } from 'react';
import { ItemsProviderContext } from './ItemsContext.tsx';
import type { ItemCardData } from '../types.ts';

export const ItemsContext = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<ItemCardData[]>([]);

  function deleteItem(item: ItemCardData): void {
    const filteredItems = items.filter((listItem) => listItem.uuid !== item.uuid);
    setItems(filteredItems);
  }

  return (
    <ItemsProviderContext.Provider value={{ items, setItems, deleteItem }}>
      {children}
    </ItemsProviderContext.Provider>
  );
};
