import { CoursePart } from "../Types"
import Part from "./Part"

/*

      {parts.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
*/

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part}/>
      ))}
    </div>
  )
}

export default Content
