import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import beepSound from "../Sounds/beepSound.wav";
import beepSound2 from "../Sounds/beepSound2.wav";

import Toggle from "react-toggle";
import "react-toggle/style.css";

//Change At Will
const ARRAYSIZE = 100;

export default function SortingVisualizer() {
  //Array Used to Sort
  const [primaryArray, setPrimaryArray] = useState([]);

  //Animation Speed
  const [animationSpeed, setAnimationSpeed] = useState(40);

  const [soundOn, setSoundOn] = useState(true);

  //AlgorithmChosen
  const [algorithm, setAlgorithm] = useState({});

  // Sound Effects
  const [playBeep1] = useSound(beepSound, { volume: soundOn ? 0.15 : 0 });
  const [playBeep2] = useSound(beepSound2, { volume: soundOn ? 0.05 : 0 });

  //Initial Random Array
  useEffect(() => {
    randomizeArray();
  }, []);

  /* Requires: Array size is set
   * Effect: Generates a random array with values from 20 to 400 and changes the array state
   */
  function randomizeArray() {
    for (var i = 0; i < primaryArray.length; i++) {
      var bar = document.getElementById(i).style;
      bar.backgroundColor = "#ff7f50";
    }
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

  //ANIMATION FOR WHEN THE SORTING IS FINISHED
  async function finishedAnimation() {
    for (var i = 0; i < primaryArray.length; i++) {
      var bar = document.getElementById(i).style;
      bar.backgroundColor = "green";
      playBeep1();
      await sleep(animationSpeed);
    }
  }

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
          playBeep1();
        }
        playBeep2();
      }
      if (sorted) finishedAnimation();
    }
  }

  //HeapSort
  async function heapSort() {
    var arr = primaryArray;

    var length = arr.length;
    var index = Math.floor(length / 2 - 1); //This is always the last parent in a heap
    var lastChild = length - 1;

    setAlgorithm({ name: "Heap Sort", timeComplexity: "O(nlog(n))" });

    while (index >= 0) {
      heapify(arr, length, index);
      index--;

      setPrimaryArray([...primaryArray, arr]);

      //Changes the Style while swapping
      if (index >= 0) {
        let bar1 = document.getElementById(index).style;
        let bar2 = document.getElementById(index + 1).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        await sleep(animationSpeed);

        playBeep1();
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
      playBeep2();

      setPrimaryArray([...primaryArray, arr]);

      //Changes the Style while swapping
      if (index >= 0) {
        let bar1 = document.getElementById(lastChild).style;
        let bar2 = document.getElementById(0).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        //Changes the Style back to original
        bar1.backgroundColor = "#FF7F50";
        bar2.backgroundColor = "#FF7F50";
      } else {
        await sleep(animationSpeed);
      }
    }

    // setTimeout(finishedAnimation, 2500);
    finishedAnimation();
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

  /*Merge Sort
   *
   * Splits array recursively untill individual elements are set,
   * Merge everything back while sorting.
   * Time complexity = O(nlog(n))
   *
   * Adapted from The following version By Clement Mihailescu : https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/sortingAlgorithms/sortingAlgorithms.js
   */

  function mergeSort(array) {
    setAlgorithm({ name: "Merge Sort", timeComplexity: "O(nlog(n))" });
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();

    //Call helper function with current sliced array
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);

    return array;
  }

  async function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray) {
    if (startIdx === endIdx) return;

    //Get sliced array and recursively divide it untill it has single element arrays
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);

    await sleep(animationSpeed);
    playBeep2();
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
  }

  //Performs merging
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
      playBeep1();
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        //Compare values and overwrite primary array with new sorted array
        mainArray[k++] = auxiliaryArray[i++];
        setPrimaryArray([...primaryArray, mainArray]);
        let bar1 = document.getElementById(k).style;
        let bar2 = document.getElementById(i).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        setTimeout(() => {
          bar1.backgroundColor = "#ff7f50";
          bar2.backgroundColor = "#ff7f50";
        }, 800);
      } else {
        //Compare values and overwrite primary array with new sorted array
        mainArray[k++] = auxiliaryArray[j++];
        setPrimaryArray([...primaryArray, mainArray]);
        let bar1 = document.getElementById(k).style;
        let bar2 = document.getElementById(i).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";
        setTimeout(() => {
          bar1.backgroundColor = "#ff7f50";
          bar2.backgroundColor = "#ff7f50";
        }, 200);
      }
    }

    mergeBack(i, j, k, middleIdx, endIdx, mainArray, auxiliaryArray);
  }

  //MergeBack and fill the sorted Array
  function mergeBack(i, j, k, midIndex, endIndex, mainArray, auxiliaryArray) {
    while (i <= midIndex) {
      mainArray[k++] = auxiliaryArray[i++];
      setPrimaryArray([...primaryArray, mainArray]);
    }
    while (j <= endIndex) {
      mainArray[k++] = auxiliaryArray[j++];
      setPrimaryArray([...primaryArray, mainArray]);
    }
  }

  /*
   * Quick Sort
   *
   *
   *
   *
   *
   *
   */

  function quickSort() {
    setAlgorithm({ name: "Quick Sort", timeComplexity: "O(nlog(n))" });
    var currentArr = primaryArray;
    var left = 0;
    var right = currentArr.length - 1;

    sort(currentArr, left, right);
    setTimeout(finishedAnimation, 2500);
  }

  async function sort(arr, left, right) {
    if (left < right) {
      var partitionIndex = partition(arr, left, right);

      setPrimaryArray([...primaryArray, arr]);
      await sleep(animationSpeed + 100);
      playBeep2();
      sort(arr, left, partitionIndex - 1);
      sort(arr, partitionIndex + 1, right);
    }
  }

  function partition(arr, left, right) {
    var pivot = arr[right];
    var i = left - 1;
    playBeep1();
    for (var j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        let bar1 = document.getElementById(i).style;
        let bar2 = document.getElementById(j).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        setTimeout(() => {
          bar1.backgroundColor = "#ff7f50";
          bar2.backgroundColor = "#ff7f50";
        }, 200);

        setPrimaryArray([...primaryArray, arr]);
      }
    }

    var temp = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp;

    return i + 1;
  }

  /////RadixSort

  function radixCaller() {
    setAlgorithm({ name: "Radix Sort", timeComplexity: "O(log10(n))" });
    var currentArr = primaryArray;
    radixSort(currentArr);
  }

  async function radixSort(arr) {
    const max = getMax(arr); // length of the max digit in the array

    for (let i = 0; i < max; i++) {
      let buckets = Array.from({ length: 10 }, () => []);
      for (let j = 0; j < arr.length; j++) {
        buckets[getPosition(arr[j], i)].push(arr[j]); // pushing into buckets
        var bar = document.getElementById(i).style;
        bar.backgroundColor = "#6A5ACD";
      }

      await sleep(animationSpeed + 300);

      var animArr = [];
      for (var c = 0; c < ARRAYSIZE / 10; c++) {
        animArr.push(randomVals(0, ARRAYSIZE - 1));
      }

      animArr.forEach((val) => {
        var bar = document.getElementById(val).style;
        bar.backgroundColor = "#DC143C";
        playBeep1();
      });

      var animArr2 = [];
      for (var c = 0; c < ARRAYSIZE / 10; c++) {
        animArr2.push(randomVals(0, ARRAYSIZE - 1));
      }

      animArr2.forEach((val) => {
        var bar = document.getElementById(val).style;
        bar.backgroundColor = "#6A5ACD";
        playBeep2();
      });

      arr = [].concat(...buckets);
      setPrimaryArray(arr);
    }

    finishedAnimation();

    return arr;
  }

  function getMax(arr) {
    let max = 0;
    for (let num of arr) {
      if (max < num.toString().length) {
        max = num.toString().length;
      }
    }
    return max;
  }

  function getPosition(num, place) {
    var result = Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    return result;
  }

  return (
    <div className="sortingVisualizer">
      <div className="header">
        {/* Algorithm Buttons */}
        <div className="headerBttns">
          <button onClick={randomizeArray}>New Array</button>
          <button onClick={bubbleSort}>Bubble Sort</button>
          <button onClick={heapSort}>Heap Sort</button>
          <button
            onClick={() => {
              mergeSort(primaryArray);
              setTimeout(finishedAnimation, 2000);
            }}
          >
            Merge Sort
          </button>
          <button onClick={quickSort}>Quick Sort</button>
          <button onClick={radixCaller}>Radix Sort</button>
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
        <div className="toggle">
          <Toggle
            defaultChecked={soundOn}
            icons={false}
            onChange={() => {
              setSoundOn(!soundOn);
            }}
          />
          <span id="soundLabel">Sound {soundOn ? "On" : "Off"}</span>
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

      {algorithm.name != undefined && (
        <div className="algorithmInfo">
          <>
            <div id="name">Algorithm: {algorithm.name}</div>
            <div id="timeComplexity">
              Time Complexity: {algorithm.timeComplexity}{" "}
            </div>
          </>
        </div>
      )}
    </div>
  );
}
