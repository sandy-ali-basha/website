// ** React Imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ** MUI Imports
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiTabList from '@mui/lab/TabList';
import CircularProgress from '@mui/material/CircularProgress';
import { Card, Container } from '@mui/material';

// ** Icon Imports
import Icon from 'components/modules/icon';

// ** Demo Tabs Imports
import TabAccount from './TabAccount';
import TabBilling from './TabBilling';
import TabSecurity from './TabSecurity';
import TabOrders from './TabOrders';
import TabAddresses from './TabAddresses';
import TabPoints from './TabPoints';

const TabList = styled(MuiTabList)(({ theme }) => ({
  border: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    },
    '&:hover': {
      color: theme.palette.primary.main
    },
    '& .MuiLink-root': {
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'inherit',
      ...(!theme.breakpoints.down('md') && { '& svg': { marginRight: theme.spacing(2) } })
    }
  }
}));

const AccountSettings = ({ tab, apiPricingPlanData }) => {
  // ** State
  // const [activeTab, setActiveTab] = useState(tab);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isClient, setIsClient] = useState(false);
  // const navigate = useNavigate();
  // const hideText = useMediaQuery(theme => theme.breakpoints.down('md'));

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // const handleChange = (event, value) => {
  //   setIsLoading(true);
  //   navigate(`/profile/${value.toLowerCase()}`);
  // };

  // useEffect(() => {
  //   if (tab && tab !== activeTab) {
  //     setActiveTab(tab);
  //   }
  //   setIsLoading(false); // Stop loading after setting the active tab
  // }, [tab]);

  // if (!isClient) {
  //   return null;
  // }
  
  // const tabContentList = {
  //   account: <TabAccount />,
  //   security: <TabSecurity />,
  //   billing: <TabBilling apiPricingPlanData={apiPricingPlanData} />,
  //   orders: <TabOrders />,
  //   addresses: <TabAddresses />,
  //   points: <TabPoints />
  // };

  return (
    <h3>ds</h3>
    // <Container sx={{ mt: 12 }}>
    //   <Grid container spacing={6}>
    //     <Grid item xs={12}>
    //       <TabContext value={activeTab}>
    //         <Grid container spacing={3}>
    //           <Grid item xs={12}>
    //             <TabList
    //               variant='scrollable'
    //               scrollButtons='auto'
    //               onChange={handleChange}
    //               aria-label='customized tabs example'
    //             >
    //               <Tab
    //                 value='account'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 1 } }) }}>
    //                     <Icon fontSize='1.25rem' icon='tabler:users' />
    //                     {!hideText && 'Account'}
    //                   </Box>
    //                 }
    //               />
    //               <Tab
    //                 value='security'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 1 } }) }}>
    //                     <Icon fontSize='1.25rem' icon='tabler:lock' />
    //                     {!hideText && 'Security'}
    //                   </Box>  
    //                 }
    //               />
    //               <Tab
    //                 value='billing'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 1 } }) }}>
    //                     <Icon fontSize='1.25rem' icon='tabler:file-text' />
    //                     {!hideText && 'Billing'}
    //                   </Box>
    //                 }
    //               />
    //               <Tab
    //                 value='orders'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 1 } }) }}>
    //                     <Icon fontSize='1.25rem' icon='tabler:shopping-cart' />
    //                     {!hideText && 'Orders'}
    //                   </Box>
    //                 }
    //               />
    //               <Tab
    //                 value='addresses'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 1 } }) }}>
    //                     <Icon fontSize='1.25rem' icon='mdi:address-marker-outline' />
    //                     {!hideText && 'Addresses'}
    //                   </Box>
    //                 }
    //               />
    //               <Tab
    //                 value='points'
    //                 label={
    //                   <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 1 } }) }}>
    //                     <Icon fontSize='1.25rem' icon='mdi:address-marker-outline' />
    //                     {!hideText && 'My Points'}
    //                   </Box>
    //                 }
    //               />
    //             </TabList>
    //           </Grid>
    //           <Grid item xs={12}>
    //             {isLoading ? (
    //               <Card sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column', height: '50vh',
    //               justifyContent:'center', boxShadow:5 }}>
    //                 <CircularProgress sx={{ mb: 4 }} />
    //                 <Typography>Loading...</Typography>
    //               </Card>
    //             ) : (
    //               <TabPanel sx={{ p: 0,mb:2 }} value={activeTab}>
    //                 {tabContentList[activeTab]}
    //               </TabPanel>
    //             )}
    //           </Grid>
    //         </Grid>
    //       </TabContext>
    //     </Grid>
    //   </Grid>
    // </Container>
  );
};

export default AccountSettings;
