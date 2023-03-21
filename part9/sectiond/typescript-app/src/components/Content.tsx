import { CoursePart } from "../Types"
import Part from "./Part"

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
