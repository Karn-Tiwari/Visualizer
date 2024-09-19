// Import necessary dependencies from React and sorting algorithms
import React, { useState, useEffect, useRef } from "react";
import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSort";
import { getQuickSortAnimations } from "../SortingAlgorithms/QuickSort";
import { getBubbleSortAnimations } from "../SortingAlgorithms/BubbleSort";
import { getInsertionSortAnimations } from "../SortingAlgorithms/InsertionSort";
import { getSelectionSortAnimations } from "../SortingAlgorithms/SelectionSort";
import { getHeapSortAnimations } from "../SortingAlgorithms/HeapSort";

// Define constants for window dimensions, number of array bars, animation speed, and colors
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = Math.floor(WINDOW_WIDTH / 15); // Number of bars depends on window width
const ANIMATION_SPEED_OPTIONS = {
  "0.25x": 150, // Slowest speed
  "0.5x": 75,
  "1x": 5, // Default speed
  "1.5x": 2.5,
  "2x": 1.5, // Fastest speed
};
const PRIMARY_COLOR = "#2db5a3"; // Teal color for default state of bars
const SECONDARY_COLOR = "#f43f5e"; // Red color for comparison during sorting
const BACKGROUND_COLOR = "#1e293b"; // Dark background color

// Main SortingVisualizer functional component
const SortingVisualizer = () => {
  // State management using React hooks
  const [array, setArray] = useState([]); // State for array of values
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(""); // Store selected sorting algorithm
  const [isSorting, setIsSorting] = useState(false); // Track sorting state to disable/enable actions
  const [playbackSpeed, setPlaybackSpeed] = useState("1x"); // Manage playback speed selection
  const timeoutsRef = useRef([]); // Reference to store and manage timeouts

  // useEffect hook to reset the array on component load or window resize
  useEffect(() => {
    resetArray(); // Initialize array when component loads
    window.addEventListener("resize", handleResize); // Add resize event listener
    return () => window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
  }, []);

  // Adjust window dimensions and array size when window is resized
  const handleResize = () => {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    NUMBER_OF_ARRAY_BARS = Math.floor(WINDOW_WIDTH / 8); // Recalculate number of array bars
    resetArray(); // Reset the array when resizing
  };

  // Function to reset the array with random values and clear any ongoing animations
  const resetArray = () => {
    if (isSorting) {
      clearTimeouts(); // Clear any active animations
      setIsSorting(false); // Set sorting state to false
      resetBarColors(); // Reset the colors of all bars
    }
    const newArray = []; // Create a new array
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      // Populate array with random values
      newArray.push(randomIntFromInterval(5, WINDOW_HEIGHT / 2));
    }
    setArray(newArray); // Update state with new array
  };

  // Reset the colors of all bars back to the default PRIMARY_COLOR
  const resetBarColors = () => {
    const arrayBars = document.getElementsByClassName("array-bar"); // Get all bars
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR; // Set color to primary
    }
  };

  // Disable sorting buttons during an ongoing sort (currently no buttons to disable)
  const disableSortButtons = () => {
    // No buttons to disable since we removed them
  };

  // Restore sorting buttons after sorting finishes (currently no buttons to restore)
  const restoreStoreButtons = () => {
    // No buttons to restore since we removed them
  };

  // Function to handle Merge Sort and its animation
  const mergeSort = () => {
    disableSortButtons(); // Disable buttons during sort
    const [animations, sortArray] = getMergeSortAnimations(array); // Get animations from the algorithm
    animateSort(animations); // Animate the sorting process
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_OPTIONS[playbackSpeed] * animations.length) / 2 + 3000
    );
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME); // Restore buttons after sort
  };

  // Function to handle Quick Sort and its animation
  const quickSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getQuickSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_OPTIONS[playbackSpeed] * animations.length) / 2 + 3000
    );
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  // Function to handle Bubble Sort and its animation
  const bubbleSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getBubbleSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_OPTIONS[playbackSpeed] * animations.length) / 2 + 3000
    );
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  // Function to handle Insertion Sort and its animation
  const insertionSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getInsertionSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_OPTIONS[playbackSpeed] * animations.length) / 2 + 3000
    );
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  // Function to handle Selection Sort and its animation
  const selectionSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getSelectionSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_OPTIONS[playbackSpeed] * animations.length) / 2 + 3000
    );
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  // Function to handle Heap Sort and its animation
  const heapSort = () => {
    disableSortButtons();
    const [animations, sortArray] = getHeapSortAnimations(array);
    animateSort(animations);
    const RESTORE_TIME = parseInt(
      (ANIMATION_SPEED_OPTIONS[playbackSpeed] * animations.length) / 2 + 3000
    );
    setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
  };

  // Handle changes in the sorting algorithm dropdown menu
  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value); // Update selected algorithm state
  };

  // Handle changes in the playback speed dropdown menu
  const handlePlaybackSpeedChange = (e) => {
    setPlaybackSpeed(e.target.value); // Update playback speed state
  };

  // Execute the sorting animation based on the selected algorithm
  const executeSelectedSort = () => {
    if (!selectedAlgorithm) return; // Do nothing if no algorithm is selected
    disableSortButtons();
    switch (selectedAlgorithm) {
      case "mergeSort":
        mergeSort();
        break;
      case "quickSort":
        quickSort();
        break;
      case "bubbleSort":
        bubbleSort();
        break;
      case "insertionSort":
        insertionSort();
        break;
      case "selectionSort":
        selectionSort();
        break;
      case "heapSort":
        heapSort();
        break;
      default:
        restoreStoreButtons(); // Restore buttons if invalid algorithm is selected
    }
  };

  // Animate the sorting process based on the given animations
  const animateSort = (animations) => {
    setIsSorting(true); // Mark sorting as in progress
    const speedMultiplier = ANIMATION_SPEED_OPTIONS[playbackSpeed]; // Get speed multiplier based on selected speed
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar"); // Get all bars
      const isColorChange =
        animations[i][0] === "comparision1" || animations[i][0] === "comparision2"; // Check if it's a comparison
      if (isColorChange) {
        const color =
          animations[i][0] === "comparision1" ? SECONDARY_COLOR : PRIMARY_COLOR; // Determine color based on comparison
        const [, barOneIndex, barTwoIndex] = animations[i]; // Destructure animation data
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        const timeoutId = setTimeout(() => {
          barOneStyle.backgroundColor = color; // Change bar colors for comparison
          barTwoStyle.backgroundColor = color;
        }, i * speedMultiplier); // Delay color change based on animation speed
        timeoutsRef.current.push(timeoutId); // Store timeout for later use
      } else {
        const [, barIndex, newHeight] = animations[i]; // Destructure animation data for height change
        if (barIndex === -1) continue; // Skip if invalid bar index
        const barStyle = arrayBars[barIndex].style;
        const timeoutId = setTimeout(() => {
          barStyle.height = `${newHeight}px`; // Update bar height during sorting
        }, i * speedMultiplier); // Delay height update based on animation speed
        timeoutsRef.current.push(timeoutId); // Store timeout for later use
      }
    }
    setTimeout(() => setIsSorting(false), animations.length * speedMultiplier); // Mark sorting as complete after all animations
  };

  // Clear all active timeouts (used to stop animations if needed)
  const clearTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId)); // Clear each stored timeout
    timeoutsRef.current = []; // Reset timeouts reference
  };

  // Generate a random integer between min and max (inclusive)
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Render the SortingVisualizer component's UI
  return (
    <div className="sorting-visualizer-container">
      <div className="controls">
        <button onClick={resetArray}>Reset Array</button> {/* Reset array button */}
        <button onClick={executeSelectedSort} disabled={isSorting}>
          Start Sort
        </button> {/* Start sort button */}
        <div>
          <label htmlFor="algorithm-select">Algorithm:</label> {/* Algorithm dropdown */}
          <select
            id="algorithm-select"
            value={selectedAlgorithm}
            onChange={handleAlgorithmChange}
            disabled={isSorting}
          >
            <option value="">Select Algorithm</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="heapSort">Heap Sort</option>
          </select>
        </div>
        <div>
          <label htmlFor="speed-select">Playback Speed:</label> {/* Playback speed dropdown */}
          <select
            id="speed-select"
            value={playbackSpeed}
            onChange={handlePlaybackSpeedChange}
            disabled={isSorting}
          >
            <option value="0.25x">0.25x</option>
            <option value="0.5x">0.5x</option>
            <option value="1x">1x</option>
            <option value="1.5x">1.5x</option>
            <option value="2x">2x</option>
          </select>
        </div>
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px`, backgroundColor: PRIMARY_COLOR }}
          ></div>
        ))} {/* Render each array bar */}
      </div>
    </div>
  );
};

export default SortingVisualizer;
