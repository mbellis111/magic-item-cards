import { exampleItemDescription, exampleItemDetails, exampleItemName } from '../../constants.ts';
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
import type { ItemCardData } from '../../types.ts';
import { useItemsContext } from '../../state/ItemsHook.tsx';
import ItemCard from '../ItemCard/ItemCard.tsx';
import { v7 as uuidv7 } from 'uuid';
import './CardEditor.css';

const CardEditor = () => {
  const { items, setItems } = useItemsContext();
  const [name, setName] = useState<string>(exampleItemName);
  const [details, setDetails] = useState<string>(exampleItemDetails);
  const [description, setDescription] = useState<string>(exampleItemDescription);
  const [useMarkdown, setUseMarkdown] = useState<boolean>(true);

  const [showToast, setShowToast] = useState<boolean>(false);

  function handleResetClicked(): void {
    setName(exampleItemName);
    setDetails(exampleItemDetails);
    setDescription(exampleItemDescription);
    setUseMarkdown(true);
  }

  function handleClear(): void {
    setName('');
    setDetails('');
    setDescription('');
    setUseMarkdown(true);
  }

  function handleSave(): void {
    if (!name.trim()) {
      return;
    }

    // create the item
    const newCard: ItemCardData = {
      description: description,
      details: details,
      name: name,
      useMarkDown: useMarkdown,
      uuid: uuidv7(),
    };

    // add it to the provider
    setItems([...items, newCard]);
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
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleClear}>Clear</Button>
              <Button onClick={handleResetClicked}>Reset</Button>
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
