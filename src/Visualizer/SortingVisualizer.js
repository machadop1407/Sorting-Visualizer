import React, { useState, useEffect } from "react";

const ARRAYSIZE = 100;

export default function SortingVisualizer() {
  const [primaryArray, setPrimaryArray] = useState([]);

  useEffect(() => {
    randomizeArray();
  }, []);

  function randomizeArray() {
    var array = [];
    for (var i = 0; i < ARRAYSIZE; i++) {
      array.push(randomVals(20, 200));
    }

    setPrimaryArray(array);
  }

  function randomVals(min, max) {
    var randomVal = Math.floor(Math.random() * (max - min + 1) + min);
    return randomVal;
  }

  return (
    <div className="sortingVisualizer">
      <div className="header">
        <div className="headerBttns">
          <button>Generate New Array</button>
          <button>Generate New Array</button>
          <button>Generate New Array</button>
        </div>
      </div>
      <div className="arrayContainer">
        {primaryArray &&
          primaryArray.map((val, key) => {
            return <div id="bar" key={key} style={{ height: val }}></div>;
          })}
      </div>
    </div>
  );
}
