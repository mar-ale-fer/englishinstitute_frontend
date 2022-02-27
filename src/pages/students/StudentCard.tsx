import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import StudentDelete from './StudentDelete'
import { Grid } from '@mui/material';
import moment from "moment";


export function StudentCard( props : any) {
  return (
      <Card >
        <Grid container>
          <Grid item xs={12}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {props.student.email}
              </Typography>
              <Typography variant="h6" component="h3">
                {props.student.firstName}
              </Typography>
              <Typography variant="h6" component="h3">
                {props.student.lastName}
              </Typography>
              <Typography variant="h6" component="h3">
                {props.student.documentNumber}
              </Typography>
              <Typography variant="h6" component="h3">
                {props.student.observations}
              </Typography>
              <Typography variant="h6" component="h3">
                {props.student.phoneNumber}
              </Typography>
              <Typography variant="h6" component="h3">
                {moment(props.student.dateOfBirth).format("DD/MM/YYYY")} 
              </Typography>
            </CardContent>
          </Grid>
          {/* <CardActions> */}
          <Grid item xs={6}>
            <Link
                to={`/student-update/${props.student.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
                key={'student_update_'+props.student.id}
            >
              <Button size="small"><EditIcon /></Button>
            </Link>          
          </Grid>
          <Grid item xs={6}>
              <StudentDelete studentId= {props.student.id} />        
          </Grid>
        </Grid>
        {/* </CardActions> */}
      </Card>
  );
}