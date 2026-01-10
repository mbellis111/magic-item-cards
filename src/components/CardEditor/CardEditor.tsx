import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ItemCard from '../ItemCard/ItemCard.tsx';
import { useItemStore } from '../../state/useItemStore.ts';
import { v7 as uuidv7 } from 'uuid';
import type { ItemCardData } from '../../types.ts';
import {
  exampleItemDescription,
  exampleItemDetails,
  exampleItemName,
  exampleUseMarkdown,
} from '../../constants.ts';
import './CardEditor.css';

const CardEditor = () => {
  // const editingItem = useItemStore((state) => state.editingItem);
  const addOrEditItem = useItemStore((state) => state.addOrEditItem);
  const getItem = useItemStore((state) => state.getItem);
  const editingItemUUID = useItemStore((state) => state.editingItemUUID);
  const setEditingItemUUID = useItemStore((state) => state.setEditingItemUUID);

  const editingItem = getItem(editingItemUUID);

  const [name, setName] = useState<string>(editingItem?.name ?? exampleItemName);
  const [details, setDetails] = useState<string>(editingItem?.details ?? exampleItemDetails);
  const [description, setDescription] = useState<string>(
    editingItem?.description ?? exampleItemDescription,
  );
  const [useMarkdown, setUseMarkdown] = useState<boolean>(
    editingItem?.useMarkDown ?? exampleUseMarkdown,
  );
  const [showToast, setShowToast] = useState<boolean>(false);

  function resetFields(): void {
    setName(editingItem?.name ?? exampleItemName);
    setDetails(editingItem?.details ?? exampleItemDetails);
    setDescription(editingItem?.description ?? exampleItemDescription);
    setUseMarkdown(editingItem?.useMarkDown ?? exampleUseMarkdown);
  }

  function clearFields(): void {
    setName('');
    setDetails('');
    setDescription('');
    setUseMarkdown(exampleUseMarkdown);
  }

  function saveItem(): void {
    if (!name.trim()) {
      return;
    }

    const updatedItem: ItemCardData = {
      uuid: editingItemUUID,
      name: name,
      details: details,
      description: description,
      useMarkDown: useMarkdown,
    };

    // add it to the provider
    addOrEditItem(updatedItem);

    // make a new editing item UUID
    setEditingItemUUID(uuidv7());

    // clear the fields
    clearFields();

    setShowToast(true);
  }

  return (
    <div className={'card-editor-component'}>
      <div className={'card-editor'}>
        <Stack spacing={3} className={'edit-fields'}>
          <TextField
            label='Item Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label='Item Details'
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            fullWidth
          />
          <TextField
            label='Item Description'
            multiline
            rows={12}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <div>
            <Typography variant={'h6'}>Options</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useMarkdown}
                  onChange={(e) => setUseMarkdown(e.target.checked)}
                />
              }
              label='Use Markdown'
            />
          </div>
          <div>
            <Typography variant={'h6'}>Actions</Typography>
            <ButtonGroup variant='outlined'>
              <Button onClick={saveItem}>Save</Button>
              <Button onClick={clearFields}>Clear</Button>
              <Button onClick={resetFields}>Reset</Button>
            </ButtonGroup>
          </div>
        </Stack>
        <div className={'item-card'}>
          <ItemCard
            name={name}
            details={details}
            description={description}
            useMarkdown={useMarkdown}
          />
        </div>
      </div>
      <Snackbar
        open={showToast}
        autoHideDuration={2000}
        onClose={() => setShowToast(false)}
        message={`Saved ${name}`}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      />
    </div>
  );
};

export default CardEditor;
