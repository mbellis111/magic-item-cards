import {useItemsContext} from '../../state/ItemsHook.tsx';
import type {ItemCardData} from '../../types.ts';
import type {ReactElement} from 'react';
import ItemCard from '../ItemCard/ItemCard.tsx';
import './PrintView.css';
import {Button} from "@mui/material";

const PrintView = () => {
  const { items } = useItemsContext();

  function handlePrint(): void {
    window.print();
  }

  function renderItems(items: ItemCardData[]): ReactElement {
    if (!items || items.length === 0) {
      return <div>Nothing here! Save items to add them to print view.</div>;
    }
    return (
      <>
        <Button onClick={handlePrint} variant={'outlined'} className={'print-button'}>Print page</Button>
        <div className={'cards-grid printable-area'}>
        {items.map((item) => {
          return (
            <ItemCard
              name={item.name}
              details={item.details}
              description={item.description}
              useMarkdown={item.useMarkDown}
              printMode={true}
              key={item.uuid}
            />
          );
        })}
      </div>
      </>
    );
  }

  return (
    <div className={'print-view-component'}>
      {renderItems(items)}
    </div>
  );
};

export default PrintView;
