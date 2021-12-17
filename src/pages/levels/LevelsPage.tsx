import { levelsFilters_RV, levelsPageNeedsRefresh_RV } from '../../cache';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LevelCard } from './LevelCard';
import { LEVELS_QUERY } from './operations/LevelsQuery';
import LevelsFilters from './LevelsFilters';
const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

const fabStyle_as_SxProps = fabStyle as SxProps;

const LevelsPage = (props : any) => {
  let navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(
    LEVELS_QUERY,
    {variables: {
      name: levelsFilters_RV(),
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
  return  <div>
    <Fab sx= {fabStyle_as_SxProps} 
        size="small" 
        color="secondary" 
        aria-label="add"
        onClick={GoToCreateLevel}
    >
      <AddIcon />
    </Fab>
    <LevelsFilters />
    {Cards }
  </div>
}

export default LevelsPage