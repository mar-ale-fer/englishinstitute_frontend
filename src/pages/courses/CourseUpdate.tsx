import { useState, useEffect  } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { COURSE_BY_ID } from './operations/CourseByIdQuery';
import { COURSE_UPDATE } from './operations/CourseUpdateMutation';
import { coursesPageNeedsRefresh_RV } from '../../cache';
import { CourseForm } from './CourseForm';

const CourseUpdatePage = () => {
    const { entityid, random } = useParams()    
    const [courseUpdate, { loading }] = useMutation(COURSE_UPDATE);

    const { data : datacourse } = useQuery(
        COURSE_BY_ID,
        {variables: {
            courseByIdId: entityid,
            debug: random 
        }}
    );

    const [s_initivalvalue, sets_initialvalue] = useState({
        year: 2022,
        schedule: "",
        details: "",
        monthlyPrice: 0,
        levelId: "0",
        active: true,
        general: ""
    });

    useEffect(() => {
        if(datacourse && datacourse.courseById && datacourse.courseById.course) {

            const course = datacourse.courseById.course;
            console.log(course);
            const initial_values={
            year: course.year,
            schedule: course.schedule,
            details: course.details,
            monthlyPrice: course.monthlyPrice,
            levelId: course.level.id,
            active: course.active,
            general: ""
          } 
          sets_initialvalue(initial_values);
        }
      },[datacourse])

    return (
        <CourseForm 
          entityId={entityid as string}
          initial_values={s_initivalvalue}
          operation={courseUpdate}
          refresh={coursesPageNeedsRefresh_RV}
          goBack='/courses'
          loading={loading}
          button_label='Modificar curso'
          apiReturnName='courseUpdate'
        />
    
    );
};

export default CourseUpdatePage;