import { useState, useEffect  } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { STUDENT_BY_ID } from './operations/StudentByIdQuery';
import { STUDENT_UPDATE } from './operations/StudentsUpdateMutation';
import { studentsPageNeedsRefresh_RV } from '../../cache';
import { StudentForm } from './StudentForm';

const StudentUpdatePage = () =>  {
  const { entityid, random } = useParams()
  const [studentUpdate, { loading }] = useMutation(STUDENT_UPDATE);

  const { data:datastudent } = useQuery(
    STUDENT_BY_ID, 
    {variables: {
      studentByIdId: entityid,
      debug: random  //path for update data
      }
  });

  const [s_initivalvalue, sets_initialvalue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    documentNumber: '',
    phoneNumber: '',
    dateOfBirth: Date(),
    observations: '',
    general: ''
  })

  useEffect(() => {
    if(datastudent && datastudent.studentById && datastudent.studentById.student) {
      const initial_values={
        firstName: datastudent.studentById.student.firstName,
        lastName: datastudent.studentById.student.lastName,
        email: datastudent.studentById.student.email,
        documentNumber: datastudent.studentById.student.documentNumber,
        phoneNumber: datastudent.studentById.student.phoneNumber,
        dateOfBirth: datastudent.studentById.student.dateOfBirth,
        observations: datastudent.studentById.student.observations,          
        general:''
      } 
      sets_initialvalue(initial_values);
    }
  },[datastudent])

  return (
    <StudentForm 
      entityId={entityid as string}
      initial_values={s_initivalvalue}
      operation={studentUpdate}
      refresh={studentsPageNeedsRefresh_RV}
      goBack='/students'
      loading={loading}
      button_label='Modificar nivel'
      apiReturnName='studentUpdate'
    />

)};

export default StudentUpdatePage;
