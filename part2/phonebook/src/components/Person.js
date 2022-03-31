import React from "react";

const Person = ({name, number,id,deleteHandle}) => <div key={id}>{name} {number} <button onClick={() => deleteHandle(id)}>delete</button></div>

export default Person