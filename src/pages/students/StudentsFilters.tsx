import { useQuery } from '@apollo/client';
import { studentsFilters_RV, studentsFilters_RV_initialvalue } from '../../cache';
import { studentsFiltersType } from './operations/StudentsFiltersType';
import {GET_STUDENTFILTERS_RV} from './operations/studentsFilters_rv_query'
import { useState, useEffect  } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import * as log  from 'loglevel';

import {
  Button, 
} from '@material-ui/core';

const validation_schema = Yup.object({});

type studentsFiltersFormik = studentsFiltersType & {general:string}
const StudentsFilters = () =>  {

  const [s_initialvalue, sets_initialvalue] = useState<studentsFiltersFormik>({
    firstName:'',
    lastName:'',
    email:'',
    documentNumber:'',
    observations: '',
    general:''
  })

  const { data:studentsFiltersData } = useQuery(GET_STUDENTFILTERS_RV);  
  useEffect(() => {
    if(studentsFiltersData && studentsFiltersData.studentsFilters_RV) {
      const initial_values : studentsFiltersFormik ={
          firstName: studentsFiltersData.studentsFilters_RV.firstName,
          lastName: studentsFiltersData.studentsFilters_RV.lastName,
          email: studentsFiltersData.studentsFilters_RV.email,
          documentNumber: studentsFiltersData.studentsFilters_RV.documentNumber,
          observations: studentsFiltersData.studentsFilters_RV.observations,
          general: ''
      } 
      sets_initialvalue(initial_values);
    }
  },[studentsFiltersData])
  
  const deleteStudentsFilters = () => {
    studentsFilters_RV(studentsFilters_RV_initialvalue)
  }
  
  const handleSubmit = (values: studentsFiltersFormik , actions: FormikHelpers<studentsFiltersFormik>) => {
        //update filters in cache
        studentsFilters_RV({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          documentNumber: values.documentNumber,
          observations: values.observations,
        })
        actions.setSubmitting(false);    
  }
  return (
    <Formik
      initialValues={s_initialvalue}
      onSubmit={(values, actions) => handleSubmit(values, actions)} 
      enableReinitialize={true}
      validationSchema= {validation_schema}
    >
      {props =>(
        <Form onSubmit={props.handleSubmit}>

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
                value={props.values.documentNumber} 
                name="documentNumber" 
                placeholder="N° de Documento" 
                component={TextField}
            /> 
            {props.touched.documentNumber && props.errors.documentNumber ? 
            (<div>{props.errors.documentNumber}</div>) : null}  

            <Field 
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.observations} 
                name="observations" 
                placeholder="Observaciones" 
                component={TextField}
            /> 
            {props.touched.observations && props.errors.observations ? 
            (<div>{props.errors.observations}</div>) : null}  

          <div style={{ color: 'red' }}>{props.errors.general}</div>
          <Button variant="contained" color="primary" type="submit">
            <SearchIcon />
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => deleteStudentsFilters()}
          >
            <SearchOffIcon />
          </Button>          
        </Form>
      )}

    </Formik>
)};

export default StudentsFilters;