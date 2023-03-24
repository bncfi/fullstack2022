import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from "../services/patients";
import diagnosisService from "../services/diagnosis";
import { Patient, Diagnosis } from '../types';

const Singlepatient =  () => {
    const id = useParams().id as string;
    const [patient, setPatient] = useState<Patient>();
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

    useEffect(()=> {
        const fetchData = async() => {
        const patientFetch = await patientService.findPatient(id);
        setPatient(patientFetch)
        }

        const fetchDiagnosis = async() => {
            const diagnosisFetch = await diagnosisService.getAll();
            setDiagnosis(diagnosisFetch);
        }
        fetchData();
        fetchDiagnosis();
    },[]);

    

    if(!patient) {
        return <></>
    }



    return(
        <div>
            <div>{patient.name}</div>
            <div>{patient.gender}</div>
            <div>{patient.occupation}</div>
            
            <div>{patient.entries? patient.entries.map(entry => {
                let diag;
                if (entry.diagnosisCodes) {
                    diag = diagnosis?.filter(diago => {
                        if (entry.diagnosisCodes?.includes(diago.code)) {
                         return diago.code+' '+diago.name   
                        }})
                }
                const printDiag= diag?.map(elem => elem.code+' '+elem.name)
                return <><div>{entry.date}</div><div>{entry.description}</div><div>{printDiag}</div><div>{entry.specialist}</div></>
            }) : null}</div>
        </div>
    )
}

export default Singlepatient