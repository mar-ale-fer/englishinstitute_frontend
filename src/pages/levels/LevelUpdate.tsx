import { useState, useEffect  } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { LEVEL_BY_ID } from './operations/LevelByIdQuery';
import { LEVEL_UPDATE } from './operations/LevelUpdateMutation';
import { levelsPageNeedsRefresh_RV } from '../../cache';
import { LevelForm } from './LevelForm';

const LevelUpdatePage = () =>  {
  const { entityid, random } = useParams()
  const [levelUpdate, { loading }] = useMutation(LEVEL_UPDATE);

  const { data:datalevel } = useQuery(
    LEVEL_BY_ID, 
    {variables: {
      levelByIdId: entityid,
      debug: random  //path for update data
      }
  });

  const [s_initivalvalue, sets_initialvalue] = useState({
    name:'',
    general: ''
  })

  useEffect(() => {
    if(datalevel && datalevel.levelById && datalevel.levelById.level) {
      const initial_values={
          name: datalevel.levelById.level.name,
          general:''
      } 
      sets_initialvalue(initial_values);
    }
  },[datalevel])

  return (
    <LevelForm 
      entityId={entityid as string}
      initial_values={s_initivalvalue}
      operation={levelUpdate}
      refresh={levelsPageNeedsRefresh_RV}
      goBack='/levels'
      loading={loading}
      button_label='Modificar nivel'
      apiReturnName='levelUpdate'
    />

)};

export default LevelUpdatePage;
