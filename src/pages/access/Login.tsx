import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import institute_logo from '../../images/institute_logo.png';

import { 
  Typography,
  Button
} from '@mui/material';

import { CREATE_LOGIN_TOKEN } from '../../operations/access/CreateTokenMutation';

const esquema_validacion = Yup.object({
  username: Yup.string()
    .min(5, 'Debe tenér más de 5 caracteres')
    .required('Requerido'),
  password: Yup.string()
    .min(6, 'Debe tener más de 6 caracteres')
    .required('Requerido')
});

const Login = () => {
  const [CredentialsCreateToken, { loading }] = useMutation(CREATE_LOGIN_TOKEN);

  return <Formik
    initialValues={{
        username: '', 
        password: '',
        general: '', //a virtual property for errors handling
    }}

    onSubmit={(values, actions) => {
      console.log('onsubmit');
      CredentialsCreateToken({ variables: {
        user: values.username,
        password: values.password
      } })
      .then(( data ) => {
         console.log(data);
         console.log(data.data.credentialsCreateToken);
         const authresponse: any = data.data.credentialsCreateToken;
         if (authresponse.success) {
            const token: string = authresponse.token;
            localStorage.setItem('token', token);
            alert('Sesión iniciada');
         } else {
          actions.setFieldError('general', authresponse.message);
         }
      })
      .catch(error => {
        console.log(error)
        actions.setFieldError('general', error.message);
      })
      .finally(() => {
        actions.setSubmitting(false);
        
      });
    }}


    
    validationSchema= {esquema_validacion}
  >
    {props =>(
      <div>
        <Form onSubmit={props.handleSubmit}>
          
          <Field 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.username} 
              name="username" 
              placeholder="email" 
              component={TextField}
          /> 
          {props.touched.username && props.errors.username ? 
          (<div>{props.errors.username}</div>) : null}
          <Field 
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password} 
              name="password" 
              placeholder="password" 
              component={TextField}
          />
          {props.touched.password && props.errors.password ? 
          (<div>{props.errors.password}</div>) : null}
          <div style={{ color: 'red' }}>{props.errors.general}</div>
          <Button 
            variant="contained"
            color="primary"
            disabled={loading}
            // onClick={submitForm}
            type="submit"
          >
            Iniciar la sesión </Button>
        </Form>  
        <Typography>
        <img src={institute_logo} width="200px" alt="Logo del Instituto" />
        </Typography>      
      </div>
      
    )}
  </Formik>
};

export default Login;
