import CardEditor from './components/CardEditor/CardEditor.tsx';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { type SyntheticEvent, useState } from 'react';
import { ItemsContext } from './state/ItemsProvider.tsx';
import PrintView from './components/PrintView/PrintView.tsx';
import ManageItems from './components/ManageItems/ManageItems.tsx';
import './App.css';

function App() {
  const [value, setValue] = useState('1');

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <ItemsContext>
        <Typography variant='h2' component='h2' gutterBottom>
          Magic Item Cards
        </Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='tabs_nav'>
              <Tab label='Create Item' value='1' />
              <Tab label='Manage Items' value='2' />
              <Tab label='Print Items' value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <CardEditor />
          </TabPanel>
          <TabPanel value='2'>
            <ManageItems />
          </TabPanel>
          <TabPanel value='3'>
            <PrintView />
          </TabPanel>
        </TabContext>
      </ItemsContext>
    </>
  );
}

export default App;
