// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'components/modules/icon'
import ChangePasswordCard from './security/ChangePasswordCard'

const TabSecurity = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ChangePasswordCard />
      </Grid> 
    </Grid>
  )
}

export default TabSecurity
