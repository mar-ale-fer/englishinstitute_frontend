import { useQuery } from '@apollo/client';
import { levelsFilters_RV } from '../../cache';
import {GET_LEVELSFILTERS_RV} from './operations/levelsFilters_rv_query'
import { useState, useEffect  } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import * as log  from 'loglevel';

import {
  Button, 
} from '@material-ui/core';

const validation_schema = Yup.object({
  name: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido'),
});
  
const LevelsFilters = () =>  {

  const [s_initialvalue, sets_initialvalue] = useState({
    name:'',
    general:''
  })

  const { data:levelsFiltersData } = useQuery(GET_LEVELSFILTERS_RV);  
  useEffect(() => {
    log.debug('---1')
    log.debug(levelsFiltersData)
    log.debug('---2')
    if(levelsFiltersData) {
      const initial_values={
          name: levelsFiltersData,
          general: ''
      } 
      sets_initialvalue(initial_values);
    }
  },[levelsFiltersData])
  
  const deleteLevelsFilters = () => {
    log.debug('deleteLevelsFilters')
    log.debug(levelsFilters_RV())
    levelsFilters_RV("dddfd")
  }
  return (
    <Formik

      initialValues={s_initialvalue}

      onSubmit={(values, actions) => {
        //update filters in cache
        levelsFilters_RV(values.name)
        actions.setSubmitting(false);      
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
          <Button variant="contained" color="primary" type="submit">
            <SearchIcon />
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => deleteLevelsFilters()}
          >
            <SearchOffIcon />
          </Button>          
        </Form>
      )}

    </Formik>
)};

export default LevelsFilters;