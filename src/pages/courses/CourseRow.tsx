import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CourseDelete from './CourseDelete';
import SettingsIcon from '@mui/icons-material/Settings';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export function CourseRow( props : any) {
    const { course } = props
    return (
      <TableRow
      key={course.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Link
              to={`/course-update/${course.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
              key={'course_update_'+course.id}
          >
            <Button size="small"><EditIcon /></Button>
          </Link>    
          <Link
              to={`/course-detail/${course.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
              key={'course_detail_'+course.id}
            >
              <Button size="small"><SettingsIcon /></Button>
            </Link>
            <CourseDelete courseId= {props.course.id} />        
        </TableCell>
        <TableCell>
          {props.course.level.name}
        </TableCell>
        <TableCell align="left">{course.schedule}</TableCell>
        <TableCell align="left">{course.details}</TableCell>
        <TableCell align="right">{course.monthlyPrice}</TableCell>
        <TableCell align="left">{(course.active)? "Activo" : "Inactivo"}</TableCell>
        <TableCell align="right">{course.year}</TableCell>
      </TableRow>
    );
  }