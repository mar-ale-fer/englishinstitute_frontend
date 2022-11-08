import { coursesPageNeedsRefresh_RV } from "../../cache";
import { GET_COURSEFILTERS_RV } from "./operations/coursesFilters_rv_query";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CourseRow } from './CourseRow';
import { COURSE_QUERY } from "./operations/CourseQuery";
import CoursesFilters from "./CoursesFilters";
import { Grid } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Paper from '@mui/material/Paper';

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
            year: Number(coursesFiltersData.coursesFilters_RV.year),
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
    if (loading) return <p>Cargando cursos...</p>;
    if (!data) return <p> No hay cursos</p>;

    const Rows =  data.courses.courses.map(( course: any ) => (
          <CourseRow key={course.id} course={course}/>
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
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Acciones</TableCell>
                        <TableCell align="left">Nivel</TableCell>
                        <TableCell align="left">Días y horarios</TableCell>
                        <TableCell align="left">detalles</TableCell>
                        <TableCell align="right">Valor</TableCell>
                        <TableCell align="left">Estado</TableCell>
                        <TableCell align="right">Año</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {Rows}
                    </TableBody>
                </Table>
                </TableContainer>    
            </Grid>
        </div>
    )
}

export default CoursesPage;