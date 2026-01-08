import { useContext } from 'react';
import { ItemsProviderContext } from './ItemsContext.tsx';

export const useItemsContext = () => {
  const context = useContext(ItemsProviderContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsContext');
  }
  return context;
};
