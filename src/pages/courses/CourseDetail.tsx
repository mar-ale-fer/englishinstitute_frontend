import { useQuery } from '@apollo/client';
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SxProps } from '@mui/system';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

import StudentsFilters from '../students/StudentsFilters'
import { studentsPageNeedsRefresh_RV } from '../../cache';
import { coursesPageNeedsRefresh_RV } from "../../cache";
import {GET_STUDENTFILTERS_RV} from '../students/operations/studentsFilters_rv_query'
import { STUDENTS_QUERY } from '../students/operations/StudentsQuery';
import CourseAddStudent from './CourseAddStudent'
import CourseRemoveStudent from './CourseRemoveStudent'
import { GET_COURSES_REFRESH } from './operations/getCoursesRefresh';
import {COURSE_BY_ID} from './operations/CourseByIdQuery'

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabStyle_as_SxProps = fabStyle as SxProps;


const CourseDetail = () =>  {
  let navigate = useNavigate();
  const { entityid, random } = useParams() 
  const { data:studentsFiltersData } = useQuery(GET_STUDENTFILTERS_RV);
  const { data:coursesRefresh } = useQuery(GET_COURSES_REFRESH);
  const [studentsQueryResult, setStudentsQueryResult] = useState([])
  const { data:dataStudents, loading:loadingStudents, error:errorStudents } = useQuery(
    STUDENTS_QUERY,
    {variables: {
      firstName: studentsFiltersData.studentsFilters_RV.firstName,
      lastName: studentsFiltersData.studentsFilters_RV.lastName,
      email: studentsFiltersData.studentsFilters_RV.email,
      documentNumber: studentsFiltersData.studentsFilters_RV.documentNumber,
      observations: studentsFiltersData.studentsFilters_RV.observations,
      debug: studentsPageNeedsRefresh_RV(),
      },
    // pollInterval: 5000,
    });
    const { data: dataCourse, loading: loadingCourse, error: errorCourse } = useQuery(
      COURSE_BY_ID, 
      {variables: {
        courseByIdId: entityid,
        debug: coursesRefresh + random? random : '' + coursesPageNeedsRefresh_RV()
        }, 
    });

    useEffect(()=>{
      console.log(dataCourse)
      if (dataCourse && dataCourse.courseById && dataCourse.courseById.course 
        && dataCourse.courseById.course.students) {
          setStudentsQueryResult(dataCourse.courseById.course.students)
        }
    },[coursesRefresh, dataCourse, random])

    const GoToCourses = () =>{ 
      navigate('/courses');
    };


    if (errorStudents) return <div style={{ color: 'red' }}>{errorStudents.message}</div>;
    if (!dataStudents) return <p> No hay estudiantes</p>;
    if (loadingStudents) return <p>Cargando estudiantes...</p>;

    if (errorCourse) return <div style={{ color: 'red' }}>{errorCourse.message}</div>;
    if (!dataCourse) return <p> No hay información sobre el curso</p>;
    if (loadingCourse) return <p>Cargando curso...</p>;

    const StudentsList = () => {

      if (dataStudents && 
        dataStudents.students && 
        dataStudents.students.students
      ) {

        return  (dataStudents.students.students.map(( student: any, ) => (
          <ListItem
            key = {`student_item_${student.id}`}
            secondaryAction={
              <CourseAddStudent courseId={dataCourse.courseById.course.id} studentId={student.id}/> 
            }
          >
            <ListItemAvatar>
              <Avatar>
              <PeopleAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={student.first}
              secondary={`${student.lastName}, ${student.firstName}`}
              /> 
          </ListItem>)
        ));
      } else {
        return <Typography variant="h5" gutterBottom component="div">
            No hay estudiantes
          </Typography> 
      }
    }

    const StudentsInCourse = (studentsQueryResult: any[]) => {
      console.log('StudentsInCourse')
      console.log(studentsQueryResult)
      return  studentsQueryResult.map(( student: any, ) => (
        <ListItem
          key = {`studentInCourse_item_${student.id}`}
          secondaryAction={
            <CourseRemoveStudent courseId= {dataCourse.courseById.course.id} studentId={student.id} />
          }
        >
          <ListItemAvatar>
            <Avatar>
            <PeopleAltIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${student.firstName} ${student.lastName}`}
            secondary={student.email}
            style={{ cursor: 'pointer' }}
            /> 
        </ListItem>
      ));
    }
    
 
  return (
    <>
    <Fab sx= {fabStyle_as_SxProps} 
        size="small" 
        color="secondary" 
        aria-label="return"
        onClick={GoToCourses}
    >
      <ArrowBackIosNewIcon />
    </Fab>    
    <Box sx={{ width: '100%', maxWidth: 1000 }}>  
      <Typography variant="h6" gutterBottom component="div">
        {dataCourse.courseById.course.level.name}
      </Typography>
      <Typography variant="h5" gutterBottom component="div">
      {dataCourse.courseById.course.details}
      </Typography>

      <Stack direction="row" spacing={2}> 
        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
        <Paper style={{maxHeight: 500, overflow: 'auto'}}>          
          <Stack direction="column" spacing={2}> 
            Matricular estudiantes 
            <StudentsFilters />
            <Grid container>
              {StudentsList()}
            </Grid>
          </Stack>
        </Paper>
        </Box>
        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" gutterBottom component="div">
              Matriculados en el curso
            </Typography>
            {StudentsInCourse(studentsQueryResult)}
          </Stack>        
        </Box>
      </Stack>
    </Box>
    </>
  )
}

export default CourseDetail