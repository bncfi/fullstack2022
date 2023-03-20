import { CoursePart } from "../Types";

const Part = ({part} : {part : CoursePart} ) => {
    return(
        <div>
            <p><b>{part.name} {part.exerciseCount}</b></p>
            {(()=> {
                switch(part.kind) {
                    case('basic'):
                        return <p> {part.description}</p>
                    case('group'): 
                        return <p>project exercises {part.groupProjectCount}</p>
                    case('background'):
                        return <div><p>{part.backroundMaterial}</p><p>{part.description}</p></div>
                    case('special'):
                        return <div><p>{part.description}</p><p>{part.requirements.map(req => <> {req} </>)}</p></div>
                }
            })()}
        </div>
    )
};

export default Part;