import { useQuery } from '@apollo/client';
import { coursesFilters_RV, coursesFilters_RV_initialvalue, levelsPageNeedsRefresh_RV } from '../../cache';
import { GET_COURSEFILTERS_RV } from './operations/coursesFilters_rv_query';
import { LEVELS_QUERY } from '../levels/operations/LevelsQuery';
import { useState, useEffect  } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField,  } from 'formik-material-ui';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { CustomSelect } from '../../components/common/CustomSelect';

import Button from '@mui/material/Button';
import { coursesFiltersType } from './operations/CoursesFiltersType';

const validation_schema = Yup.object({});

type coursesFiltersFormik = coursesFiltersType & {general:string}

const CoursesFilters = () =>  {
  const { data: datalevel} = useQuery(LEVELS_QUERY,
    {variables: {
      name: "",
      debug: levelsPageNeedsRefresh_RV(),
      }});
  const [s_levels, sets_levels] = useState([])  
     
  const [s_initialvalue, sets_initialvalue] = useState<coursesFiltersFormik>({
      year: 0,
      schedule: "",
      details: "",
      levelId: "0",
      active: true,
      general:""
  })
  
    const { data:coursesFiltersData } = useQuery(GET_COURSEFILTERS_RV);  
    useEffect(() => {
      if(coursesFiltersData && coursesFiltersData.coursesFilters_RV) {
        const initial_values={
            year: coursesFiltersData.coursesFilters_RV.year,
            schedule: coursesFiltersData.coursesFilters_RV.schedule,
            details: coursesFiltersData.coursesFilters_RV.details,
            levelId: coursesFiltersData.coursesFilters_RV.levelId,
            active: coursesFiltersData.coursesFilters_RV.active,
            general: ''
        } 
        sets_initialvalue(initial_values);
      }
    },[coursesFiltersData])

    useEffect(() => {
      if(datalevel && datalevel.levels && datalevel.levels.levels) {
        let level_options = datalevel.levels.levels.map( (level : any) => (
          {
            value:level.id,
            label: level.name
          }
        ));
        level_options.push({
          value:"0",
          label:"Todos los niveles"
        })
        sets_levels(level_options);
      }
    },[datalevel])

    const deleteCoursesFilters = () => {
      coursesFilters_RV(coursesFilters_RV_initialvalue) 
    }


    const handleSubmit = (values: coursesFiltersFormik, actions: FormikHelpers<coursesFiltersFormik>) => {
        //update filters in cache
        coursesFilters_RV({
            year: values.year,
            schedule: values.schedule,
            details: values.details,
            levelId: values.levelId,
            active: values.active
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
                value={props.values.year} 
                name="year" 
                placeholder="Año" 
                component={TextField}
            /> 
            {props.touched.year && props.errors.year ? 
            (<div>{props.errors.year}</div>) : null}

            <Field 
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.schedule} 
                name="schedule" 
                placeholder="Horario de clases" 
                component={TextField}
            /> 
            {props.touched.schedule && props.errors.schedule ? 
            (<div>{props.errors.schedule}</div>) : null}  

            <Field 
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.details} 
                name="details" 
                placeholder="Detalles, ej.: Profesor/a" 
                component={TextField}
            /> 
            {props.touched.details && props.errors.details ? 
            (<div>{props.errors.details}</div>) : null}  

            <Field
              className="custom-select"
              name="levelId"
              options={s_levels}
              component={CustomSelect}
              placeholder="Seleccioná un motivo de consulta..."
              isMulti={false}
            />
            {props.touched.levelId && props.errors.levelId ? 
            (<div>{props.errors.levelId}</div>) : null}  

            <label>
                Curso activo
                <Field type="checkbox" name="active" />
            </label>
            <div style={{ color: 'red' }}>{props.errors.general}</div>
            <Button variant="contained" color="primary" type="submit">
              <SearchIcon />
            </Button>
            <Button variant="contained" color="primary"
              onClick={() => deleteCoursesFilters()}
            >
              <SearchOffIcon />
            </Button>          
          </Form>
        )}
  
      </Formik>
  )};
  
  export default CoursesFilters;