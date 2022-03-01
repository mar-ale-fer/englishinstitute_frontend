import { useMutation } from '@apollo/client';
import { STUDENT_CREATE } from './operations/StudentCreateMutation';
import { studentsPageNeedsRefresh_RV } from '../../cache';
import { entityForm, StudentForm } from './StudentForm';

const initial_values : entityForm = {
    firstName: '',
    lastName: '',
    email: '',
    documentNumber: '',
    phoneNumber: '',
    dateOfBirth: Date(),
    observations: '',
    general: ''
}

const StudentCreatePage = () => {
    const [studentCreate, { loading }] = useMutation(STUDENT_CREATE);

    return (
        <StudentForm 
            entityId= ""
            initial_values = { initial_values }
            operation = { studentCreate }
            refresh = { studentsPageNeedsRefresh_RV }
            goBack = '/students'
            loading = { loading }
            button_label = 'Crear estudiante'
            apiReturnName = 'studentCreate'
        />
);};

export default StudentCreatePage;