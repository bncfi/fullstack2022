import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>
const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>
const Part = ({ part }) => <p> {part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return(
    <>
    {
    parts.map((part) => <Part key={part.id} part={part} />)
    }
    </>
  )
}

const Course = ({course}) => {
  const initialValue = 0
  const sum = course.parts
    .map(part => part.exercises)
    .reduce((currentSum,valueToAdd) => {
      return currentSum+valueToAdd
    },initialValue)
  return(
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  )
}

export default Course