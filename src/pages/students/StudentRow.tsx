import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import StudentDelete from './StudentDelete'
import moment from "moment";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export function StudentRow( props : any) {
  const { student } = props
  return (
      <TableRow
        key={student.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row">
          <Link
                to={`/student-update/${student.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
                key={'student_update_'+student.id}
            >
              <Button size="small"><EditIcon /></Button>
          </Link>
          <StudentDelete studentId= {student.id} />          
        </TableCell>
        <TableCell align="left">{student.lastName}</TableCell>
        <TableCell align="left">{student.firstName}</TableCell>
        <TableCell align="left">{student.email}</TableCell>
        <TableCell align="left">{student.documentNumber}</TableCell>
        <TableCell align="left">{student.observations}</TableCell>
        <TableCell align="left">{student.phoneNumber}</TableCell>
        <TableCell align="left">{moment(student.dateOfBirth).format("DD/MM/YYYY")}</TableCell>
      </TableRow>
  );
}