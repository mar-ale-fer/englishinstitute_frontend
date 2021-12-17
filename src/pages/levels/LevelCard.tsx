import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import LevelDelete from './LevelDelete'

export function LevelCard( props : any) {
  return (
    <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.level.id}
        </Typography>
        <Typography variant="h6" component="h3">
          {props.level.name}
        </Typography>
      </CardContent>
      <CardActions>
      <Link
          to={`/level-update/${props.level.id}/${Math.random().toString(36).replace(/[^a-z]+/g, '')}`}
          key={'level_update_'+props.level.id}
      >
        <Button size="small"><EditIcon /></Button>
      </Link>
      <LevelDelete levelId= {props.level.id} />
      </CardActions>
    </Card>
  );
}