import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
// import { CREATE_USER } from '../operations/mutations/userMutations';
import { CREATE_INSTITUTE } from '../operations/mutations/InstituteMutations';
import { useNavigate } from 'react-router-dom';

import {
  Button, 
} from '@material-ui/core';

const esquema_validacion = Yup.object({
  firstName: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
  lastName: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
  code: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
  code2: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Requerido'),
  type: Yup.string(),
});
  
const UserCreate = () =>  {
  let navigate = useNavigate();
  const [createUser, { loading }] = useMutation(CREATE_INSTITUTE );

  const GoBackToUsers = () =>{ 
    navigate('/users');
  };

  return (

    <Formik

      initialValues={
        {
          code:'',
          code2:'',
          firstName:'',
          lastName:'',
          email:'',
          type:'',
          general: ''
        }
      }

      onSubmit={(values, actions) => {

        console.log('onsubmit');

        createUser({ variables: {
          createUserCode: values.code,
          createUserCode2: values.code2,
          createUserFirstName: values.firstName,
          createUserLastName: values.lastName,
          createUserEmail: values.email,
          createUserType: values.type,
        } })
        .then((data) => {
          const response: any = data.data.createUser;
          if ((response.success) as boolean ) {

            history.push('/users');
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
              value={props.values.code} 
              name="code" 
              placeholder="CUIL" 
              component={TextField}
          /> 
          {props.touched.code && props.errors.code ? 
          (<div>{props.errors.code}</div>) : null}

          <Field 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.code2} 
              name="code2" 
              placeholder="Código" 
              component={TextField}
          /> 
          {props.touched.code2 && props.errors.code2 ? 
          (<div>{props.errors.code2}</div>) : null}

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
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.type} 
              name="type" 
              placeholder="Tipo" 
              component={TextField}
          />

          {props.touched.type && props.errors.type ? 
          (<div>{props.errors.type}</div>) : null}    
          
          <div style={{ color: 'red' }}>{props.errors.general}</div>
          <Button 
            variant="contained"
            color="primary"
            disabled={loading}
            // onClick={submitForm}
            type="submit"
          >
            Crear usuario
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

export default UserCreate;
