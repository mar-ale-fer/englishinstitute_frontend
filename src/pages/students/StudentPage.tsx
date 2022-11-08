import { studentsPageNeedsRefresh_RV } from '../../cache';
import {GET_STUDENTFILTERS_RV} from './operations/studentsFilters_rv_query'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { StudentRow } from './StudentRow';
import { STUDENTS_QUERY } from './operations/StudentsQuery';
import StudentsFilters from './StudentsFilters';
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

const StudentsPage = (props : any) => {
  let navigate = useNavigate();
  const { data:studentsFiltersData } = useQuery(GET_STUDENTFILTERS_RV);

  const { data, loading, error } = useQuery(
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
  if (loading) return <p>Cargando estudiantes...</p>;
  if (!data) return <p> No hay estudiantes</p>;
   const Rows =  data.students.students.map(( student: any ) => (
    <StudentRow key={student.id} student={student}/>
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell>Acciones</TableCell>
              <TableCell align="left">Apellido</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right">Documento</TableCell>
              <TableCell align="left">Observaciones</TableCell>
              <TableCell align="right">Teléfono</TableCell>
              <TableCell align="right">Nacimiento</TableCell>
              <TableCell align="right">Cuota</TableCell>
              <TableCell align="right">Cursos</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {Rows}
          </TableBody>
      </Table>
      </TableContainer>         
    </Grid>

  </div>
}

export default StudentsPage