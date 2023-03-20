import { CourseType } from "../Types"

const Total = ({parts} : {parts: CourseType[]}) => {
return(
    <div>
         Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
)
}

export default Total