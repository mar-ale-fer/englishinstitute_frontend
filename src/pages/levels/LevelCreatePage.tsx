import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import { LEVEL_CREATE } from './operations/LevelCreateMutation';
import { useNavigate } from 'react-router-dom';
import { levelsPageNeedsRefresh_RV } from '../../cache';
import { Button } from '@material-ui/core';
import * as log  from 'loglevel';

const validation_schema = Yup.object({
  name: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
});

const LevelCreatePage = () =>  {
  let navigate = useNavigate()
  const [levelCreate, { loading }] = useMutation(LEVEL_CREATE);

  const GoBackToLevels = () =>{ 
    navigate('/levels');
  };

  return (
    <Formik
      initialValues={
        {
          name:'',
          general:''
        }
      }
      onSubmit={(values, actions) => {
        log.info(`craatelevel_onsubmit`)
        levelCreate({ variables: {
          name: values.name,
        } })
        .then((data) => {
          const response: any = data.data.levelCreate;
          if ((response.success) as boolean ) {
            levelsPageNeedsRefresh_RV( Math.random().toString(36) as string )
            navigate('/levels');
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
      validationSchema= {validation_schema}
    >
      {props =>(
        <Form onSubmit={props.handleSubmit}>
          <Field 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name} 
              name="name" 
              placeholder="Nombre" 
              component={TextField}
          /> 
          {props.touched.name && props.errors.name ? 
          (<div>{props.errors.name}</div>) : null}
    
          <div style={{ color: 'red' }}>{props.errors.general}</div>
          <Button variant="contained" color="primary" disabled={loading} type="submit">
            Crear nivel
          </Button>
          <Button variant="contained" color="primary" onClick={GoBackToLevels} type="submit">
              Cancelar 
          </Button>
        </Form>
      )}
    </Formik>
);};

export default LevelCreatePage;
