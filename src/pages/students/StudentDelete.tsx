import { useMutation } from '@apollo/client';
import { STUDENT_DELETE } from './operations/StudentDeleteMutation';

import EntityDelete from '../../components/common/EntityDelete';
import { studentsPageNeedsRefresh_RV } from '../../cache';

 const StudentDelete = (props: { studentId: number; }) => {
    const [studentDelete, { loading: deleting }] = useMutation(STUDENT_DELETE);
    return <EntityDelete 
      entity="student"
      entityId={props.studentId}
      deleting={deleting}
      entityDelete={studentDelete}
      refresh={studentsPageNeedsRefresh_RV}
      goback="/students"

    />
  }
  export default StudentDelete;