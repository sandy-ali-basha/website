
// ** Third Party Imports
import { useEffect } from 'react';
import AccountSettings from './tabs/AccountSettings';
import { useParams } from 'react-router-dom';

const Profile =  () => {
  const params = useParams()
 useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <AccountSettings tab={params.tab}  />
  );
};

export default Profile;
