import { usersPageNeedsRefresh_RV } from '../../cache';
import {GET_USERSFILTERS_RV} from './operations/usersFilters_rv_query'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UserCard } from './UserCard';
import { USERS_QUERY } from './operations/UsersQuery';
import UsersFilters from './UsersFilters';
const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

const fabStyle_as_SxProps = fabStyle as SxProps;

const LevelsPage = (props : any) => {
  let navigate = useNavigate();
  const { data:usersFiltersData } = useQuery(GET_USERSFILTERS_RV);  
  const { data, loading, error, refetch } = useQuery(
    USERS_QUERY,
    {variables: {
      firstName: usersFiltersData.firstName,
      lastName: usersFiltersData.lastName,
      email: usersFiltersData.email,
      debug: usersPageNeedsRefresh_RV(),
      },
    pollInterval: 5000,
    });

  const GoToCreateUser = () =>{ 
    navigate('/user-create');
  };


  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data) return <p> No hay usuarios</p>;
  if (loading) return <p>Cargando usuarios...</p>;
   const Cards =  data.users.users.map(( user: any ) => (
    <div key={user.id} style={{ display: "inline-block" }}>
      <UserCard user={user}/>
    </div>
  ));
  return  <div>
    <Fab sx= {fabStyle_as_SxProps} 
        size="small" 
        color="secondary" 
        aria-label="add"
        onClick={GoToCreateUser}
    >
      <AddIcon />
    </Fab>
    <UsersFilters />
    {Cards }
  </div>
}

export default LevelsPage