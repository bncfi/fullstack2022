import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from "../services/patients";
import { Patient } from '../types';

const Singlepatient =  () => {
    const id = useParams().id as string;
    const [patient, setPatient] = useState<Patient>();

    useEffect(()=> {
        const fetchData = async() => {
        const patientFetch = await patientService.findPatient(id);
        setPatient(patientFetch)
        }
        fetchData();
    },[]);
    if(!patient) {
        return <></>
    }

    return(
        <div>
            <div>{patient.name}</div>
            <div>{patient.gender}</div>
            <div>{patient.occupation}</div>
        </div>
    )
}

export default Singlepatient