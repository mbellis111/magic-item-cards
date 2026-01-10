import type { ItemCardData } from '../../types.ts';
import type { ReactElement } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  styled,
  Typography,
} from '@mui/material';
import { saveAs } from 'file-saver';
import { useItemStore } from '../../state/useItemStore.ts';
import './ManageItems.css';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface ManageItemsProps {
  changeTab: (value: string) => void;
}

// const ItemCard = (props: Readonly<ItemCardProps>) => {
//   const { name, details, description, useMarkdown, image, printMode } = props;

const ManageItems = (props: Readonly<ManageItemsProps>) => {
  const { changeTab } = props;
  const items = useItemStore((state) => state.items);
  const setItems = useItemStore((state) => state.setItems);
  const deleteItem = useItemStore((state) => state.deleteItem);
  const setEditingItemUUID = useItemStore((state) => state.setEditingItemUUID);

  function handleEditItem(item: ItemCardData): void {
    setEditingItemUUID(item.uuid);
    changeTab('1');
  }

  function renderItem(item: ItemCardData): ReactElement {
    return (
      <ListItem>
        <Card sx={{ width: 345 }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {item.name}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {item.details}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={() => handleEditItem(item)}>
              Edit
            </Button>
            <Button size='small' onClick={() => deleteItem(item)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </ListItem>
    );
  }

  function renderItems(items: ItemCardData[]): ReactElement {
    if (!items || items.length === 0) {
      return <Typography>Nothing here! Create items to populate this section.</Typography>;
    }
    return (
      <>
        <div className={'manage-cards-grid'}>
          <List>
            {items.map((item) => {
              return renderItem(item);
            })}
          </List>
        </div>
      </>
    );
  }

  function handleExport(items: ItemCardData[]): void {
    const jsonRaw = JSON.stringify(items);
    const blob = new Blob([jsonRaw], { type: 'application/json' });
    saveAs(blob, 'magic_items_data.json');
  }

  async function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('FileReader result is null or empty'));
        }
      };

      reader.onerror = (event) => {
        reject(event.target?.error || new Error('Unknown FileReader error'));
      };

      reader.readAsText(file);
    });
  }

  async function handleImport(files: FileList | null): Promise<void> {
    console.log(files);
    const file = files?.[0];
    if (!file) {
      return;
    }
    const value = await readFileAsText(file);
    if (!value) {
      return;
    }
    const asObject = JSON.parse(value);
    // TODO check that it is correct and matches the zod schema
    setItems(asObject);
  }

  function handleDeleteAll(): void {
    setItems([]);
  }

  return (
    <div className={'manage-items-container'}>
      <ButtonGroup variant='outlined' className={'button-row'}>
        <Button onClick={() => handleExport(items)}>Export Items</Button>
        <Button component='label'>
          Import Items
          <VisuallyHiddenInput
            type='file'
            onChange={(event) => handleImport(event.target.files)}
            accept='application/json'
          />
        </Button>
        <Button onClick={handleDeleteAll}>Delete All</Button>
      </ButtonGroup>
      {renderItems(items)}
    </div>
  );
};

export default ManageItems;
