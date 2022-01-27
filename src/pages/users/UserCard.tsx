import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import UserDelete from './UserDelete'

export function UserCard( props : any) {
  return (
    <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.user.email}
        </Typography>
        <Typography variant="h6" component="h3">
          {props.user.firstName}
        </Typography>
        <Typography variant="h6" component="h3">
          {props.user.lastName}
        </Typography>
      </CardContent>
      <CardActions>
      <Link
          to={`/user-update/${props.user.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
          key={'user_update_'+props.user.id}
      >
        <Button size="small"><EditIcon /></Button>
      </Link>
      <UserDelete userId= {props.user.id} />
      </CardActions>
    </Card>
  );
}