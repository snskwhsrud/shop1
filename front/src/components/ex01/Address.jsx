import React, { useState } from "react";
import Insert from "./lnsert";

const Address = () => {
  const [array, setArray] = useState([
    { id: 1, name: "리액트1", address: "서울 가산디지털" },
    { id: 2, name: "리액트2", address: "서울 용산" },
    { id: 3, name: "리액트3", address: "서울 구로" },
    { id: 4, name: "리액트4", address: "서울 강남" },
  ]);

  const onInsert = (form) => {
    setArray(array.concat(form));
    alert("주소 추가!");
  };
  return (
    <div>
      <Insert onInsert={onInsert} />
      <h1>주소목록</h1>
      {array.map((person) => (
        <h1 key={person.id}>
          {person.id}:{person.name}:{person.address}
        </h1>
      ))}
    </div>
  );
};

export default Address;
