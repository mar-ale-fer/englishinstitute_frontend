import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { TextField, CheckboxWithLabel  } from 'formik-material-ui';
import {USER_CREATE } from './operations/UserCreateMutation';
import { Navigate, useNavigate } from 'react-router-dom';
import { usersFiltersType } from './operations/UsersFiltersType';
import { usersPageNeedsRefresh_RV } from '../../cache';
import { Button, FormGroup, FormControl } from '@material-ui/core';
import * as log  from 'loglevel';
import { propsToClassKey } from '@mui/styles';

const options = [
    {label:'Administrador', value:'ADMINISTRATOR'},
    {label:'Instituto', value:'INSTITUTE'},
    {label:'Secretaría', value:'SECRETARY'},
    {label:'Estudiante', value:'STUDENT'},
    {label:'Profesor/a', value:'TEACHER'}
]

type userForm = usersFiltersType &
                {
                    password:string,
                    mustChangePassword: boolean
                    roles: string[],
                    general:string
                }

const initial_values : userForm= {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    mustChangePassword:true,
    roles:[],
    general:""
}


const validation_schema = Yup.object({
    firstName: Yup.string()
    .min(2, 'Debe tener más de 2 caracteres')
    .required('Requerido')
})

const UserCreatePage = () => {
    let navigate = useNavigate()
    const [userCreate, {loading}] = useMutation(USER_CREATE);

    const handleSubmit = (values: userForm , actions: FormikHelpers<userForm>) => {
        log.info('create_user_onsubmit')
        userCreate({variables: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            mustChangePassword: values.mustChangePassword,
            roles: values.roles
            // password: $password, mustChangePassword: $mustChangePassword, roles: $roles)


        }})
        .then((data)=>{
            const response: any = data.data.userCreate
            if((response.success) as boolean) {
                usersPageNeedsRefresh_RV( Math.random().toString(36) as string)
                navigate('/users')
            } else {
                alert(response.message)
                actions.setFieldError('general', response.message)
            }
        })
        .catch(error => {
            actions.setFieldError('general', 'Error al enviar formulario:'+ error.message)
        })
        .finally(()=>{
            actions.setSubmitting(false)
        })
        actions.setSubmitting(false);    
    }
    
    const GoBackToUsers = () => {
        navigate('/users');
    };    

    return (
        <Formik 
            initialValues={initial_values}
            onSubmit={(values, actions)=> handleSubmit(values,actions)}
            enableReinitialize={true}
            validationSchema={validation_schema}
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
                        value={props.values.password}
                        name="password"
                        placeholder="Password"
                        component={TextField}
                    />
                    {props.touched.password && props.errors.password ?
                    (<div>{props.errors.password}</div>) : null} 
                        <FormControl component="fieldset" style={{ display: "flex"}}>
                            <FormGroup>
                                {options.map(opt => (
                                    <Field 
                                        type="checkbox"
                                        component={CheckboxWithLabel}
                                        key={opt.value}
                                        name="roles"
                                        value={opt.value}
                                        Label={{label: opt.label}}
                                        
                                    />
                                ))}
                            </FormGroup>  
                        </FormControl>

                    <Button variant="contained" color="primary" disabled={loading} type="submit">
                        Crear usuario
                    </Button>
                    <Button variant="contained" color="primary" onClick={GoBackToUsers} type="submit">
                        Cancelar
                    </Button>
                    <h3>Values</h3>
                    <pre>{JSON.stringify(props.values)}</pre>
                </Form>
            )}
        </Formik>
    )
}

export default UserCreatePage