import type { ItemCardData } from '../../types.ts';
import type { ReactElement } from 'react';
import ItemCard from '../ItemCard/ItemCard.tsx';
import { Button, Typography } from '@mui/material';
import { useItemStore } from '../../state/useItemStore.ts';
import './PrintView.css';

/**
 * Handles displaying items to print, and printing the items
 * @constructor
 */
const PrintView = () => {
  const items = useItemStore((state) => state.items);

  /**
   * Kicks off browser native printing
   */
  function handlePrint(): void {
    window.print();
  }

  /**
   * Renders the print-sized values for each item in a grid fit for letter size paper.
   * If no items, displays helper text.
   * @param items
   */
  function renderItems(items: ItemCardData[]): ReactElement {
    if (items.length === 0) {
      return <Typography>Nothing here! Create items to populate this section.</Typography>;
    }
    return (
      <>
        <Button onClick={handlePrint} variant={'outlined'} className={'print-button'}>
          Print page
        </Button>
        <div className={'cards-grid printable-area'}>
          {items.map((item) => {
            return (
              <ItemCard
                name={item.name}
                details={item.details}
                description={item.description}
                useMarkdown={item.useMarkDown}
                imageType={item.image}
                printMode={true}
                key={item.uuid}
              />
            );
          })}
        </div>
      </>
    );
  }

  return <div className={'print-view-component'}>{renderItems(items)}</div>;
};

export default PrintView;
