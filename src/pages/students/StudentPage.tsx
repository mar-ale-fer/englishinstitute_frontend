import { studentsPageNeedsRefresh_RV } from '../../cache';
import {GET_STUDENTFILTERS_RV} from './operations/studentsFilters_rv_query'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { StudentCard } from './StudentCard';
import { STUDENTS_QUERY } from './operations/StudentsQuery';
import StudentsFilters from './StudentsFilters';
import * as log  from 'loglevel';
import { Grid } from '@mui/material';
const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

const fabStyle_as_SxProps = fabStyle as SxProps;

const StudentsPage = (props : any) => {
  let navigate = useNavigate();
  const { data:studentsFiltersData } = useQuery(GET_STUDENTFILTERS_RV);

  const { data, loading, error, refetch } = useQuery(
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

  const GoToCreateStudent = () =>{ 
    navigate('/student-create');
  };

  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data) return <p> No hay estudiantes</p>;
  if (loading) return <p>Cargando estudiantes...</p>;
   const Cards =  data.students.students.map(( student: any ) => (
    <Grid key={student.id} item xs={3}>
      <StudentCard student={student}/>
    </Grid>
  ));
  return  <div>
    <Fab sx= {fabStyle_as_SxProps} 
        size="small" 
        color="secondary" 
        aria-label="add"
        onClick={GoToCreateStudent}
    >
      <AddIcon />
    </Fab>
    <StudentsFilters />
    <Grid container>
      {Cards }      
    </Grid>

  </div>
}

export default StudentsPage