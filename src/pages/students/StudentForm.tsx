import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from 'formik-material-ui';
import MUITextField from '@mui/material/TextField';

import { Button } from '@mui/material';
import moment from 'moment';

//+specific for the entity
export type entityForm = {
    firstName: string
    lastName: string
    documentNumber: string
    dateOfBirth: any
    phoneNumber: string
    email: string
    observations: string
    general: string
}

const validation_schema = Yup.object({
    firstName: Yup.string()
      .min(2, 'Debe tener más de 2 caracteres')
      .required('Requerido'),
    lastName: Yup.string()
      .min(2, 'Debe tener más de 2 caracteres')
      .required('Requerido'),
    documentNumber: Yup.string()
      .min(2, 'Debe tener más de 5 números')
      .required('Requerido'),
    phoneNumber: Yup.string()
      .min(2, 'Debe tener más de 5 números')
      .required('Requerido'),
    email: Yup.string()
      .email('Email no válido')
      .required('Requerido'),
  });

const entityVars = (entityId: string, values : any) => ({
        ...(entityId === "" ? {} : {studentUpdateId: entityId}), //if update mode
        firstName: values.firstName,
        lastName: values.lastName,
        documentNumber: values.documentNumber,
        phoneNumber: values.phoneNumber,
        email: values.email,
        dateOfBirth: moment(values.dateOfBirth).format('DD/MM/YYYY'),
        observations: values.observations
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

export const StudentForm = ( {
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
                value={props.values.documentNumber} 
                name="documentNumber" 
                placeholder="Nro. documento" 
                component={TextField}
            /> 
            {props.touched.documentNumber && props.errors.documentNumber ? 
            (<div>{props.errors.documentNumber}</div>) : null}

            <Field 
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.phoneNumber} 
                name="phoneNumber" 
                placeholder="Celular" 
                component={TextField}
            /> 
            {props.touched.phoneNumber && props.errors.phoneNumber ? 
            (<div>{props.errors.phoneNumber}</div>) : null}

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

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker 
                    label="Date picker dialog"
                    inputFormat="dd/MM/yyyy"
                    value={props.values.dateOfBirth}
                    onChange={value => props.setFieldValue("dateOfBirth", value)}
                    renderInput={(params) => <MUITextField  {...params} />}
                />
            </LocalizationProvider>
            
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