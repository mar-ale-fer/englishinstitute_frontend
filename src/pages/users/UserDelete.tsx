import { useState  } from 'react';
import { useMutation } from '@apollo/client';
import { USER_DELETE } from './operations/UserDeleteMutation';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { usersPageNeedsRefresh_RV } from '../../cache';

import DeleteIcon from '@mui/icons-material/Delete';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

 const UserDelete = (props: { userId: number; }) => {
    const [s_IWantToErase, sets_IWantToErase] = useState(false)
    const [s_Deleted, sets_Deleted] = useState(false)
    const [s_error, sets_error] = useState('')
    const [userDelete, { loading: deleting }] = useMutation(USER_DELETE);

    const remove = () => {
      if (deleting) return;
      userDelete({
        variables: { userDeleteId: props.userId }
      }).then(({ data }) => {
        const response: any = data.userDelete;
        if ((response.success) as boolean ) {
          //update reactiver variable used in userslist page, to reflect the deleted object
          usersPageNeedsRefresh_RV( Math.random().toString(36) as string )
          sets_Deleted(true);
        } else {
          alert(response.message);
        }        
        
      })
      .catch(e => {
        sets_error(e.message)
      })
      .finally(()=> {

      });
    };

    const allowDelete = () => {
      sets_IWantToErase(!s_IWantToErase)
    }

    function ShowError(props: { errorMessage: {} | null | undefined; }){
      if (props.errorMessage && props.errorMessage !== ''){
        return <p>{props.errorMessage}</p>
      }
      return null;
    }

    return (
      <div>
        <Button 
        name="quieroborrar" 
        size="small"
        onClick={allowDelete }
        disabled={ deleting || s_Deleted}      
        >
            {s_IWantToErase?'No borrar': <DeleteIcon/>}
        </Button>
        <ColorButton variant="contained"
          disabled={!s_IWantToErase || deleting || s_Deleted}
          onClick={remove}
        >borrar
        </ColorButton>
        <ShowError errorMessage={s_error} />
      </div>

    );
  }
  export default UserDelete;