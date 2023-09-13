import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { Button } from '@mui/material';
import { LEVELS_QUERY } from '../levels/operations/LevelsQuery';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { CustomSelect } from '../../components/common/CustomSelect';
import { levelsPageNeedsRefresh_RV } from '../../cache';

//+specific for the entity
export type entityForm = {
    year: number
    schedule: string
    details: string
    monthlyPrice: number | null 
    levelId: string | null
    active: boolean
    general: string
}

const validation_schema = Yup.object({
    year: Yup.number()
        .min(2023,'Debe ingresar un año reciente')
        .required('Requerido'),
    schedule: Yup.string()
        .min(2, 'Debe tener más de 2 caracteres')
        .required('Requerido'),
    details: Yup.string()
        .min(2, 'Debe tener más de 2 caracteres')
        .required('Requerido'),
    levelId: Yup.string()
        .required('Requerido'),
    monthlyPrice: Yup.number()
        .min(1,'Debe ingresar  un número')
        .required('Requerido'),
  });

const entityVars = (entityId: string, values : any) => ({
        ...(entityId === "" ? {} : {courseUpdateId: entityId}), //if update mode
        year: Number(values.year),
        schedule: values.schedule,
        monthlyPrice: Number(values.monthlyPrice),
        details: values.details,
        levelId: values.levelId,
        active: values.active,
    });

//-specific for the entity
interface entityFormProps {
    entityId: string
    initial_values: entityForm
    operation: Function
    refresh: Function
    goBack: string
    loading: boolean
    button_label: string
    apiReturnName: string

}

export const CourseForm = ( {
    entityId,
    initial_values, 
    operation,
    refresh,
    goBack,
    loading,
    button_label,
    apiReturnName
}:entityFormProps )=>{
    let navigate = useNavigate()
    const { data: datalevel} = useQuery(LEVELS_QUERY,
        {variables: {
          name: "",
          debug: levelsPageNeedsRefresh_RV(),
          }});

    const [s_levels, sets_levels] = useState([])

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
            label:"Seleccione un nivel"
          });    
          sets_levels(level_options);
        }
      },[datalevel])

    const handleSubmit = (values: entityForm , actions: FormikHelpers<entityForm>) => {
        operation({variables: entityVars(entityId, values)})
        .then((data : any)=>{
            const response: any = data.data[apiReturnName]
            if((response.success) as boolean) {
                const randomString= Math.random().toString(36) as string
                refresh( randomString )
                navigate(goBack)
            } else {
                alert(response.message)
                actions.setFieldError('general', response.message)
            }
        })
        .catch((error : any) => {
            actions.setFieldError('general', 'Error al enviar formulario:'+ error.message)
        })
        .finally(()=>{
            actions.setSubmitting(false)
        })
        actions.setSubmitting(false);    
    } 

    const GoBackToEntities = () =>{ 
        navigate(goBack);
      };
    return (
        <Formik
        initialValues={initial_values}
        onSubmit={(values, actions)=> handleSubmit(values,actions)}
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
                placeholder="Año del curso" 
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
                placeholder="Días y horarios" 
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
                placeholder="Detalles. Ej.: profesor/a" 
                component={TextField}
            /> 
            {props.touched.details && props.errors.details ? 
            (<div>{props.errors.details}</div>) : null}

            <Field 
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.monthlyPrice} 
                name="monthlyPrice" 
                placeholder="Valor mensual del curso" 
                component={TextField}
            /> 
            {props.touched.monthlyPrice && props.errors.monthlyPrice ? 
            (<div>{props.errors.monthlyPrice}</div>) : null}

            {/* <Field 
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.levelId} 
                name="levelId" 
                placeholder="Nivel" 
                component={TextField}
            />  */}

            <Field
              className="custom-select"
              name="levelId"
              options={s_levels}
              component={CustomSelect}
              placeholder="Seleccioná un nivel..."
              isMulti={false}
            />

            {props.touched.levelId && props.errors.levelId ? 
            (<div>{props.errors.levelId}</div>) : null}

            <label>
                Curso activo
                <Field type="checkbox" name="active" />
            </label>
            
            <div style={{ color: 'red' }}>{props.errors.general}</div>
            <Button variant="contained" color="primary" disabled={loading} type="submit">
              {button_label}
            </Button>
            <Button variant="contained" color="primary" type="submit"
              onClick={GoBackToEntities}
            >
                Cancelar </Button>
          </Form>
        )}
      </Formik>
    )
}