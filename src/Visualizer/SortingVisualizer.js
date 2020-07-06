import React, { useState, useEffect, useRef } from "react";

//Change At Will
const ARRAYSIZE = 100;

export default function SortingVisualizer() {
  //Array Used to Sort
  const [primaryArray, setPrimaryArray] = useState([]);

  //Animation Speed
  const [animationSpeed, setAnimationSpeed] = useState(40);

  //Initial Random Array
  useEffect(() => {
    randomizeArray();
  }, []);

  /* Requires: Array size is set
   * Effect: Generates a random array with values from 20 to 400 and changes the array state
   */
  function randomizeArray() {
    var array = [];
    for (var i = 0; i < ARRAYSIZE; i++) {
      array.push(randomVals(20, 400));
    }

    setPrimaryArray(array);
  }

  // Generates a random val between min and max
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

          //Changes the Style while swapping
          let bar1 = document.getElementById(i).style;
          let bar2 = document.getElementById(i + 1).style;
          bar1.backgroundColor = "#DC143C";
          bar2.backgroundColor = "#6A5ACD";

          await sleep(animationSpeed);

          //Changes the Style back to original
          bar1.backgroundColor = "#FF7F50";
          bar2.backgroundColor = "#FF7F50";

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
          <button onClick={bubbleSort}>Heap Sort</button>
          <button onClick={bubbleSort}>Quick Sort</button>
          <button onClick={bubbleSort}>Merge Sort</button>
        </div>
      </div>

      <div className="arrayControllers">
        <button
          id="restart"
          onClick={() => {
            window.location.reload(false);
          }}
        >
          {" "}
          Restart
        </button>
        <div id="velocity">
          <button
            onClick={() => {
              setAnimationSpeed(80);
            }}
            id={animationSpeed == 80 ? "selected" : ""}
          >
            Slow
          </button>
          <button
            onClick={() => {
              setAnimationSpeed(40);
            }}
            id={animationSpeed == 40 ? "selected" : ""}
          >
            Medium
          </button>
          <button
            onClick={() => {
              setAnimationSpeed(5);
            }}
            id={animationSpeed == 5 ? "selected" : ""}
          >
            Fast
          </button>
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
