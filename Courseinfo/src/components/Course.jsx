const Header = (props) => {
    return (
      <h1>{props.name}</h1>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        {props.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </div>
    )
  }
  const Total = (props) => {
    const totalExercises= props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <p>
        Total of {totalExercises} Exercises
      </p>
    )
  }
  const Course = (props) => {
    return (
      <>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts}/>
      </>
    )
  }


  export default Course;
