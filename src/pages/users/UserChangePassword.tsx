import { useState, useEffect } from 'react';
import { FormikHelpers } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { USER_BY_ID } from './operations/UserByIdQuery';
import { USER_UPDATE } from './operations/UserUpdateMutation';

import { UserUpdateForm, userUpdateForm } from './UserUpdateForm';

import * as log  from 'loglevel';
import { USER_CHANGE_PASSWORD } from './operations/UserChangePasswordMutation';
import { UserChangePasswordForm, userChangePasswordForm } from './UserChangePasswordForm';
import Button from '@mui/material/Button';

const initial_values : userChangePasswordForm= {
    password:"",
    passwordConfirmation:"",
    general:""
}

interface userChangePasswordProps {
    entityId : string
}
const UserChangePassword = ({ entityId} : userChangePasswordProps) => {
    const [userChangePassword, {loading}] = useMutation(USER_CHANGE_PASSWORD);
    const [showForm, setShowForm] = useState(false)
    
    return (
        showForm 
        ? <UserChangePasswordForm
            entityId={entityId}
            initial_values={initial_values}
            operation={userChangePassword}
            loading={loading}
            button_label= "Cambiar password"
            apiReturnName='userChangePassword'
            visibility={()=>setShowForm(false)}
        />
        : <Button 
        size="small"
        onClick={()=>setShowForm(true) }    
        >
            Cambiar password
        </Button>


    )
}

export default UserChangePassword