import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CourseDelete from './CourseDelete';
import { Grid } from '@mui/material';

export function CourseCard( props : any) {
    return (
        <Card >
          <Grid container>
            <Grid item xs={12}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                {props.course.level.name}
                </Typography>
                <Typography variant="h6" component="h3">
                  {props.course.schedule}
                </Typography>
                <Typography variant="h6" component="h3">
                  {props.course.details}
                </Typography>

                <Typography variant="h6" component="h3">
                  {props.course.monthlyPrice}
                </Typography>
                <Typography variant="h6" component="h3">
                  {(props.course.active)? "Activo" : "Inactivo"}
                </Typography>
                <Typography variant="h6" component="h3">
                  {props.course.year}
                </Typography>

              </CardContent>
            </Grid>
            {/* <CardActions> */}
            <Grid item xs={6}>
              <Link
                  to={`/course-update/${props.course.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
                  key={'course_update_'+props.course.id}
              >
                <Button size="small"><EditIcon /></Button>
              </Link>          
            </Grid>
            <Grid item xs={6}>
                <CourseDelete courseId= {props.course.id} />        
            </Grid>
          </Grid>
          {/* </CardActions> */}
        </Card>
    );
  }