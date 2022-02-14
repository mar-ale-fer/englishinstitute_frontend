import { levelsPageNeedsRefresh_RV } from '../../cache';
import {GET_LEVELSFILTERS_RV} from './operations/levelsFilters_rv_query'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LevelCard } from './LevelCard';
import { LEVELS_QUERY } from './operations/LevelsQuery';
import LevelsFilters from './LevelsFilters';
import { Theme,  } from '@mui/material';
import { StyleRulesCallback, WithStyles, withStyles } from '@mui/styles';



const LevelsPage_ = (props : LevelsPageProps) => {
  const { classes } = props;
  let navigate = useNavigate();
  const { data:levelsFiltersData } = useQuery(GET_LEVELSFILTERS_RV);  
  const { data, loading, error, refetch } = useQuery(
    LEVELS_QUERY,
    {variables: {
      name: levelsFiltersData.levelsFilters_RV,
      debug: levelsPageNeedsRefresh_RV(),
      },
    pollInterval: 5000,
    });

  const GoToCreateLevel = () =>{ 
    navigate('/level-create');
  };


  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data) return <p> No hay niveles</p>;
  if (loading) return <p>Cargando niveles...</p>;
   const Cards =  data.levels.levels.map(( level: any ) => (
    <div key={level.id} style={{ display: "inline-block" }}>
      <LevelCard level={level}/>
    </div>
  ));
  return <div className={classes.root}>
      <LevelsFilters />
      <Fab sx= {fabStyle_as_SxProps} 
          size="small" 
          color="secondary" 
          aria-label="add"
          onClick={GoToCreateLevel}
      >
        <AddIcon/>
      </Fab>
      {Cards }

    </div>
}

const fabStyle = {
  position: "absolute",
  bottom: 20,
  right: 20
};

const fabStyle_as_SxProps = fabStyle as SxProps;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
});

interface LevelsPageProps extends WithStyles<typeof styles> {
  data? : any
}
export const LevelsPage = withStyles(styles)(LevelsPage_)