import { CourseType } from "../Types"

const Content = ({ parts }: { parts: CourseType[] }) => {
  return (
    <div>
      {parts.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content
