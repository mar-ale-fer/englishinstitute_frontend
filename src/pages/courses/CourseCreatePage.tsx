import { useMutation } from '@apollo/client';
import { COURSE_CREATE } from './operations/CourseCreateMutation';
import { coursesPageNeedsRefresh_RV } from '../../cache';
import { entityForm, CourseForm } from './CourseForm';

const initial_values : entityForm = {
    year: 2022,
    schedule: "",
    details: "",
    monthlyPrice: 0,
    levelId: "0",
    active: true,
    general: ""
}

const CourseCreatePage = () => {
    const [courseCreate, { loading }] = useMutation(COURSE_CREATE);

    return (
        <CourseForm 
            entityId= ""
            initial_values = { initial_values }
            operation = { courseCreate }
            refresh = { coursesPageNeedsRefresh_RV }
            goBack = '/courses'
            loading = { loading }
            button_label = 'Crear curso'
            apiReturnName = 'courseCreate'
        />
    );
}

export default CourseCreatePage;