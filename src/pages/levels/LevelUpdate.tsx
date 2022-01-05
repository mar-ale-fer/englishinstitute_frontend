import { useState, useEffect  } from 'react';
import { Formik, Form, Field } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import { LEVEL_BY_ID } from './operations/LevelByIdQuery';
import { LEVEL_UPDATE } from './operations/LevelUpdateMutation';
import { useNavigate } from 'react-router-dom';

import {
  Button, 
} from '@material-ui/core';

const esquema_validation = Yup.object({
  name: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
});
  
const LevelUpdatePage = () =>  {

  const { entityid, random } = useParams()
  let navigate = useNavigate();
  const [levelUpdate, { loading }] = useMutation(LEVEL_UPDATE);

  const { data:datalevel } = useQuery(
    LEVEL_BY_ID, 
    {variables: {
      levelByIdId: entityid,
      debug: random  //path for update data
      }
  });

  const [s_initivalvalue, sets_initialvalue] = useState({
    name:'',
    general: ''
  })

  useEffect(() => {
    if(datalevel && 
      datalevel.levelById && 
      datalevel.levelById.level) {
      const initial_values={
          name: datalevel.levelById.level.name,
          general:''
      } 
      sets_initialvalue(initial_values);
    }
  },[datalevel])

  const GoBackToLevels = () =>{ 
    navigate('/levels');
  };

  return (


    <Formik

      initialValues={s_initivalvalue}

      onSubmit={(values, actions) => {

        levelUpdate({ variables: {
          levelUpdateId: entityid,
          name: values.name,
        } })
        .then((data) => {
          const response: any = data.data.levelUpdate;
          if ((response.success) as boolean ) {
            navigate('/levels');
          } else {
            alert(response.message);
            actions.setFieldError('general', response.message);
          }
        })
        .catch(error => {
          actions.setFieldError('general', 'Error al enviar formulario:'+error.message);
        })
        .finally(() => {
          actions.setSubmitting(false);      
        });

      }}
      enableReinitialize={true}
      validationSchema= {esquema_validation}
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
            Modificar nivel
          </Button>
          <Button variant="contained" color="primary" type="submit"
            onClick={GoBackToLevels}
          >
              Cancelar </Button>
        </Form>
      )}

    </Formik>
)};

export default LevelUpdatePage;
