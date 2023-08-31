import { useState  } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { COURSE_ADD_STUDENT } from './operations/CourseAddStudentMutation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CourseAddStudent = (props: { courseId: number; studentId: number; }) => {
    let navigate = useNavigate()  
    const [s_error, sets_error] = useState('')
    const [addStudentToCourse, { loading: adding }] = useMutation(COURSE_ADD_STUDENT);

    const addStudent = () => {
      if (adding) return;
      console.log('add')
      addStudentToCourse({
        variables: { 
          courseId: props.courseId,
          studentId: props.studentId
        }
      }).then(({ data }) => {

        const response: any = data.addStudentToCourse;
        if ((response.success) as boolean ) {
          //update reactiver variable used in userslist page, to reflect the deleted object
          // myReactiveVariable( Math.random().toString(36) as string )
          console.log('refresh_add_student')
          const randomString= Math.random().toString(36) as string
          // coursesPageNeedsRefresh_RV(randomString)
          navigate(`/course-detail/${props.courseId}/${randomString}`)  
        } else {
          alert(response.message);
        }        
        
      })
      .catch(e => {
        // console.log(e);
        console.log('----error al agregar estudiante al curso ----');
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
        <ArrowForwardIosIcon
          onClick={addStudent}
          style={{ cursor: 'pointer' }}
        />
        <ShowError errorMessage={s_error} />
      </>

    );
  }
  export default CourseAddStudent;