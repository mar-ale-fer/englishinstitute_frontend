import { useMutation } from '@apollo/client';
import { COURSE_DELETE } from './operations/CourseDeleteMutation';

import EntityDelete from '../../components/common/EntityDelete';
import { coursesPageNeedsRefresh_RV } from '../../cache';

const CourseDelete = (props: { courseId: number; }) => {
    const [courseDelete, { loading: deleting }] = useMutation(COURSE_DELETE);
    return <EntityDelete 
      entity="course"
      entityId={props.courseId}
      deleting={deleting}
      entityDelete={courseDelete}
      refresh={coursesPageNeedsRefresh_RV}
      goback="/courses"
    />
  }
  export default CourseDelete;