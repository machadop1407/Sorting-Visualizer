import React, { useState, useEffect, useRef } from "react";
import * as BubbleSort from "../SortingAlgorithms/BubbleSort";

const ARRAYSIZE = 100;

export default function SortingVisualizer() {
  const [primaryArray, setPrimaryArray] = useState([]);
  const currentBar = useRef();

  useEffect(() => {
    randomizeArray();
  }, []);

  function randomizeArray() {
    var array = [];
    for (var i = 0; i < ARRAYSIZE; i++) {
      array.push(randomVals(20, 400));
    }

    setPrimaryArray(array);
  }

  function randomVals(min, max) {
    var randomVal = Math.floor(Math.random() * (max - min + 1) + min);
    return randomVal;
  }

  //SLEEP FUNCTION --> Used to slow loop iteration
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  // ------------ ALGORITHMS ------------ //

  // Bubble Sort
  async function bubbleSort() {
    var currentArr = primaryArray;

    var sorted = false;

    while (!sorted) {
      sorted = true;

      for (var i = 0; i < currentArr.length - 1; i++) {
        if (currentArr[i] > currentArr[i + 1]) {
          var swap1 = currentArr[i];
          var swap2 = currentArr[i + 1];
          currentArr[i] = swap2;
          currentArr[i + 1] = swap1;
          setPrimaryArray([...primaryArray, currentArr]);

          //Changes the Style
          let bar1 = document.getElementById(i).style;
          let bar2 = document.getElementById(i + 1).style;
          bar1.backgroundColor = "crimson";
          bar2.backgroundColor = "slateblue";

          await sleep(50);

          bar1.backgroundColor = "coral";
          bar2.backgroundColor = "coral";

          sorted = false;
        }
      }
    }
  }

  return (
    <div className="sortingVisualizer">
      <div className="header">
        <div className="headerBttns">
          <button onClick={randomizeArray}>New Array</button>
          <button onClick={bubbleSort}>Bubble Sort</button>
          <button>...</button>
        </div>
      </div>
      <div className="arrayContainer">
        {primaryArray &&
          primaryArray.map((val, key) => {
            return (
              <div
                className="bar"
                id={key}
                key={key}
                style={{ height: val }}
              ></div>
            );
          })}
      </div>
    </div>
  );
}
