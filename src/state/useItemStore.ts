import { create } from 'zustand';
import type { ItemCardData } from '../types.ts';
import { v7 as uuidv7 } from 'uuid';

interface ItemStore {
  items: ItemCardData[];
  getItem: (uuid: string) => ItemCardData | null;
  setItems: (values: ItemCardData[]) => void;
  deleteItem: (value: ItemCardData) => void;
  addOrEditItem: (value: ItemCardData) => void;
  editingItemUUID: string;
  setEditingItemUUID: (value: string) => void;
}

export const useItemStore = create<ItemStore>((set, get) => ({
  // Initial state
  items: [],
  editingItemUUID: uuidv7(),

  setEditingItemUUID: (value) => {
    set({
      editingItemUUID: value,
    });
  },

  getItem: (uuid) => get().items.find((item) => item.uuid === uuid) ?? null,

  addOrEditItem: (item) => {
    set((state) => {
      const matchingItem = state.items.find((existingItem) => existingItem.uuid === item.uuid);
      if (matchingItem) {
        // edit in place, which will update the item in the list
        matchingItem.details = item.details;
        matchingItem.description = item.description;
        matchingItem.name = item.name;
        matchingItem.useMarkDown = item.useMarkDown;
        matchingItem.image = item.image;
        return {
          items: state.items,
        };
      } else {
        return {
          items: [...state.items, item],
        };
      }
    });
  },

  setItems: (newItems: ItemCardData[]) => {
    set({
      items: newItems,
    });
  },

  deleteItem: (item: ItemCardData) => {
    set((state) => ({
      items: state.items.filter((todo) => todo.uuid !== item.uuid),
    }));
  },
}));
