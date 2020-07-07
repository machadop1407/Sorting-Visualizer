import React, { useState, useEffect, useRef } from "react";

//Change At Will
const ARRAYSIZE = 100;

export default function SortingVisualizer() {
  //Array Used to Sort
  const [primaryArray, setPrimaryArray] = useState([]);

  //Animation Speed
  const [animationSpeed, setAnimationSpeed] = useState(40);

  //AlgorithmChosen
  const [algorithm, setAlgorithm] = useState({});

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

    setAlgorithm({ name: "Bubble Sort", timeComplexity: "O(n^2)" });

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

  //HeapSort
  async function heapSort() {
    var arr = primaryArray;

    var length = arr.length;
    var index = Math.floor(length / 2 - 1); //This is always the last parent in a heap
    var lastChild = length - 1;

    while (index >= 0) {
      heapify(arr, length, index);
      index--;

      setPrimaryArray([...primaryArray, arr]);

      //Changes the Style while swapping
      if (index >= 0) {
        console.log(document.getElementById(index));
        let bar1 = document.getElementById(index).style;
        let bar2 = document.getElementById(index + 1).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        await sleep(animationSpeed);

        //Changes the Style back to original
        bar1.backgroundColor = "#FF7F50";
        bar2.backgroundColor = "#FF7F50";
      } else {
        await sleep(animationSpeed);
      }
    }

    while (lastChild >= 0) {
      var swap1 = arr[0];
      var swap2 = arr[lastChild];

      arr[0] = swap2;
      arr[lastChild] = swap1;
      heapify(arr, lastChild, 0);
      lastChild--;

      setPrimaryArray([...primaryArray, arr]);

      //Changes the Style while swapping
      if (index >= 0) {
        let bar1 = document.getElementById(lastChild).style;
        let bar2 = document.getElementById(0).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        await sleep(animationSpeed);

        //Changes the Style back to original
        bar1.backgroundColor = "#FF7F50";
        bar2.backgroundColor = "#FF7F50";
      } else {
        await sleep(animationSpeed);
      }
    }
  }

  async function heapify(arr, length, index) {
    //Represents larges node out of the three
    var largest = index;

    //Left Child
    var leftNode = index * 2 + 1;
    //Right Child
    var rightNode = leftNode + 1;

    //Check if left is largest, check if reached end
    if (arr[leftNode] > arr[largest] && leftNode < length) {
      largest = leftNode;
    }

    //Check if right is largest, check if reached end
    if (arr[rightNode] > arr[largest] && rightNode < length) {
      largest = rightNode;
    }

    //Check if parent is still largest, if not: perform a swap between the smallest and the largest
    if (largest != index) {
      var swap1 = arr[index];
      var swap2 = arr[largest];

      arr[index] = swap2;
      arr[largest] = swap1;

      heapify(arr, length, largest);
    }

    return arr;
  }

  return (
    <div className="sortingVisualizer">
      <div className="header">
        {/* Algorithm Buttons */}
        <div className="headerBttns">
          <button onClick={randomizeArray}>New Array</button>
          <button onClick={bubbleSort}>Bubble Sort</button>
          <button onClick={heapSort}>Heap Sort</button>
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

      <div className="algorithmInfo">
        {algorithm.name != undefined && (
          <>
            <div id="name">Algorithm: {algorithm.name}</div>
            <div id="timeComplexity">
              Time Complexity: {algorithm.timeComplexity}{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
