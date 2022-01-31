import { useMutation } from '@apollo/client';
import { LEVEL_DELETE } from './operations/LevelDeleteMutation';
import { levelsPageNeedsRefresh_RV } from '../../cache';

import EntityDelete from '../../components/common/EntityDelete';

 const LevelDelete = (props: { levelId: number; }) => {
  const [deleteLevel, { loading: deleting }] = useMutation(LEVEL_DELETE);
  return <EntityDelete 
    entity="level"
    entityId={props.levelId}
    deleting={deleting}
    entityDelete={deleteLevel}
    refresh={levelsPageNeedsRefresh_RV}
    goback="/levels"
  />
  }
  export default LevelDelete;