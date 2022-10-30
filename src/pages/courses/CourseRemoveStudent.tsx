import { useState  } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { COURSE_REMOVE_STUDENT } from './operations/CourseRemoveStudentMutation';
import { coursesPageNeedsRefresh_RV } from '../../cache';
// import { myReactiveVariable } from '../cache';

import DeleteIcon from '@mui/icons-material/Delete';

const CourseStudentDelete = (props: { courseId: any; studentId: any; }) => {
    let navigate = useNavigate()
    const [s_error, sets_error] = useState('')
    const [removeStudentFromCourse, { loading: deleting }] = useMutation(COURSE_REMOVE_STUDENT);

    const remove = () => {
      if (deleting) return;
      console.log('borrar')
      removeStudentFromCourse({
        variables: { 
          courseId: props.courseId,
          studentId: props.studentId
        }
      }).then(({ data }) => {
        console.log(data)
        const response: any = data.removeStudentFromCourse;
        if ((response.success) as boolean ) {
          //update reactive variable used in userslist page, to reflect the deleted object
          console.log('refresh_remove_student')
          const randomString= Math.random().toString(36) as string
          coursesPageNeedsRefresh_RV(randomString)
        } else {
          alert(response.message);
        }        
        
      })
      .catch(e => {
        // console.log(e);
        console.log('----error al borrar ----');
        sets_error(e.message)
      })
      .finally(()=> {

      });
    };

    function ShowError(props: { errorMessage: {} | null | undefined; }){
      if (props.errorMessage && props.errorMessage !== ''){
        return <p>{props.errorMessage}</p>
      }
      return null;
    }

    return (
      <>
        <DeleteIcon
        onClick={remove}
        style={{ cursor: 'pointer' }}
        />
        <ShowError errorMessage={s_error} />
      </>

    );
  }
  export default CourseStudentDelete;