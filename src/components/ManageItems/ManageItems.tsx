import {useItemsContext} from '../../state/ItemsHook.tsx';
import type {ItemCardData} from '../../types.ts';
import type {ReactElement} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import './ManageItems.css';

const ManageItems = () => {
  const { items } = useItemsContext();

  function renderItem(item: ItemCardData): ReactElement {
    const displayText = item.name + " ID: " + item.uuid;
    return (
      <ListItem>
        {displayText}
      </ListItem>
    );
  }

  function renderItems(items: ItemCardData[]): ReactElement {
    if (!items || items.length === 0) {
      return <div>Nothing here! Save items to add them to manage items.</div>;
    }
    return (
      <>
        <div className={'cards-grid printable-area'}>
          <List>
          {items.map((item) => {
            return renderItem(item);
          })}
          </List>
        </div>
      </>
    );
  }

  return (
    <div className={'manage-items-container'}>
      {renderItems(items)}
    </div>
  );
};

export default ManageItems;
