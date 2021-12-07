import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
// import { CREATE_USER } from '../operations/mutations/userMutations';
import { CREATE_INSTITUTE} from '../operations/mutations/InstituteMutations';
import { useNavigate } from 'react-router-dom';

import {
  Button, 
} from '@material-ui/core';

const esquema_validacion = Yup.object({
  instituteName: Yup.string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .required('Requerido'),
  firstName: Yup.string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .required('Requerido'),
  lastName: Yup.string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .required('Requerido'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Requerido'),    
  password: Yup.string()
    .min(8, 'Debe tener al menos 8 caracteres')
    .required('Requerido'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las claves deben coincidir')
});
  
const InstituteCreate = () =>  {
  let navigate = useNavigate();
  const [createInstituteWithUser, { loading }] = useMutation(CREATE_INSTITUTE );

  const GoBackToUsers = () =>{ 
    navigate('/');
  };

  return (

    <Formik

      initialValues={
        {
          instituteName:'',
          firstName:'',
          lastName:'',
          email:'',
          password:'',
          passwordConfirmation:'',
          general: ''
        }
      }

      onSubmit={(values, actions) => {

        console.log('onsubmit');

        createInstituteWithUser({ variables: {
          createInstituteWithUserName: values.instituteName,
          createInstituteWithUserFirstName: values.firstName,
          createInstituteWithUserLastName: values.lastName,
          createInstituteWithUserEmail: values.email,
          createInstituteWithUserPassword: values.password
        } })
        .then((data) => {
          const response: any = data.data.createInstituteWithUser;
          if ((response.success) as boolean ) {

            navigate('/');
          } else {
            alert(response.message);
            actions.setFieldError('general', response.message);
          }
        })
        .catch(error => {
          console.log(error)
          actions.setFieldError('general', 'Error al enviar formulario:'+error.message);
        })
        .finally(() => {
          actions.setSubmitting(false);      
        });

      }}
      enableReinitialize={true}
      validationSchema= {esquema_validacion}
    >
      {props =>(
        <Form onSubmit={props.handleSubmit}>
          <Field 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.instituteName}  
              name="instituteName" 
              placeholder="Nombre del Instituto" 
              component={TextField}
          /> 
          {props.touched.instituteName && props.errors.instituteName ? 
          (<div>{props.errors.instituteName}</div>) : null}

          <Field 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.firstName} 
              name="firstName" 
              placeholder="Nombre" 
              component={TextField}
          /> 
          {props.touched.firstName && props.errors.firstName ? 
          (<div>{props.errors.firstName}</div>) : null}

          <Field 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.lastName} 
              name="lastName" 
              placeholder="Apellido" 
              component={TextField}
          />
          {props.touched.lastName && props.errors.lastName ? 
          (<div>{props.errors.lastName}</div>) : null}

          <Field 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email} 
              name="email" 
              placeholder="Email" 
              component={TextField}
          />
          {props.touched.email && props.errors.email ? 
          (<div>{props.errors.email}</div>) : null}

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

          <Field 
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.passwordConfirmation} 
              name="passwordConfirmation" 
              placeholder="repita el password" 
              component={TextField}
          />
          {props.touched.passwordConfirmation && props.errors.passwordConfirmation ? 
          (<div>{props.errors.passwordConfirmation}</div>) : null}
          
          <div style={{ color: 'red' }}>{props.errors.general}</div>
          <Button 
            variant="contained"
            color="primary"
            disabled={loading}
            // onClick={submitForm}
            type="submit"
          >
            Crear instituto
          </Button>
          <Button 
            variant="contained"
            color="primary"
            onClick={GoBackToUsers}
            type="submit"
          >
              Cancelar </Button>
        </Form>


      )}

    </Formik>
);
};

export default InstituteCreate;
