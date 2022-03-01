import { coursesPageNeedsRefresh_RV } from "../../cache";
import { GET_COURSEFILTERS_RV } from "./operations/coursesFilters_rv_query";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CourseCard } from './CourseCard';
import { COURSE_QUERY } from "./operations/CourseQuery";
import CoursesFilters from "./CoursesFilters";
import { Grid } from '@mui/material';
const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

const fabStyle_as_SxProps = fabStyle as SxProps;

const CoursesPage = (props : any ) => {
    let navigate = useNavigate();
    const { data: coursesFiltersData} = useQuery( GET_COURSEFILTERS_RV);

    const { data, loading, error } = useQuery(
        COURSE_QUERY,
        {variables: {
            year: coursesFiltersData.coursesFilters_RV.year,
            schedule: coursesFiltersData.coursesFilters_RV.schedule,
            details: coursesFiltersData.coursesFilters_RV.details,
            levelId: coursesFiltersData.coursesFilters_RV.levelId,
            active: coursesFiltersData.coursesFilters_RV.active,
            debug: coursesPageNeedsRefresh_RV()
        }}
    );

    const GoToCreateCourse = () =>{
        navigate('/course-create');
    };

    if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
    if (!data) return <p> No hay cursos</p>;
    if (loading) return <p>Cargando cursos...</p>;

    const Cards =  data.courses.courses.map(( course: any ) => (
        <Grid key={course.id} item xs={3}>
          <CourseCard course={course}/>
        </Grid>
    ));

    return (
        <div>
            <Fab sx= {fabStyle_as_SxProps} 
                size="small" 
                color="secondary" 
                aria-label="add"
                onClick={GoToCreateCourse}
            >
            <AddIcon />
            </Fab>
            <CoursesFilters />
            <Grid container>
            {Cards }      
            </Grid>
        </div>
    )
}

export default CoursesPage;