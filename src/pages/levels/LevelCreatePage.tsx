import { useMutation } from '@apollo/client';
import { LEVEL_CREATE } from './operations/LevelCreateMutation';
import { useNavigate } from 'react-router-dom';
import { levelsPageNeedsRefresh_RV } from '../../cache';
import { LevelForm } from './LevelForm';

const initial_values={
  name : '',
  general : ''
}

const LevelCreatePage = () =>  {
  let navigate = useNavigate()
  const [levelCreate, { loading }] = useMutation(LEVEL_CREATE);

  return (
    <LevelForm 
      entityId=""
      initial_values={initial_values}
      operation={levelCreate}
      refresh={levelsPageNeedsRefresh_RV}
      goBack='/levels'
      loading={loading}
      button_label='Crear nivel'
      apiReturnName='levelCreate'
    />
);};

export default LevelCreatePage;
