interface ContentProps {
    name: string;
    exerciseCount: number;
}

interface ContentArray {
    parts: ContentProps;
}

const Content = (props: ContentArray[]) => {
    return (
        <>
    props.map(part => <p key={part.parts.name}> {part.parts.name} {part.parts.exerciseCount}</p>);
    </>
  )};

  export default Content;