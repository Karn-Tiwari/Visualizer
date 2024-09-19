export function getBubbleSortAnimations(array) {
  // Create an empty array to store animations.
  let animations = [];

  // Create a copy of the input array to avoid modifying the original.
  let auxillaryArray = array.slice();

  // Perform bubble sort on the copy and store animations.
  bubbleSort(auxillaryArray, animations);

  // Verify if the sorting algorithm works correctly by comparing the sorted copy with the JavaScript-sorted array.
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log("Sort works correctly?", arraysAreEqual(javaScriptSortedArray, auxillaryArray));

  // Return the animations and the sorted copy of the array.
  array = auxillaryArray;
  return [animations, array];
}

function bubbleSort(auxillaryArray, animations) {
  // Get the length of the array.
  const N = auxillaryArray.length;

  // Initialize the outer loop counter.
  let iters = N - 1;

  // Outer loop: Iterate until no swaps are made in an inner loop.
  while (iters > 0) {
    // Initialize the inner loop counter.
    let swapped = false;

    // Inner loop: Compare adjacent elements and swap if necessary.
    for (let i = 0; i < iters; ++i) {
      // Push comparison animations to the array.
      animations.push(["comparison1", i, i + 1]);
      animations.push(["comparison2", i, i + 1]);

      // Check if the elements need to be swapped.
      if (auxillaryArray[i] > auxillaryArray[i + 1]) {
        // Set the swapped flag to true.
        swapped = true;

        // Push swap animations to the array.
        animations.push(["swap", i, auxillaryArray[i + 1]]);
        animations.push(["swap", i + 1, auxillaryArray[i]]);

        // Swap the elements.
        swap(auxillaryArray, i, i + 1);
      }
    }

    // If no swaps were made in the inner loop, the array is already sorted.
    if (swapped === false) break;

    // Decrement the outer loop counter.
    iters--;
  }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  // Swap the elements at the given indices.
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}

function arraysAreEqual(firstArray, secondArray) {
  // Check if the lengths of the arrays are equal.
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  // Compare the elements of the arrays.
  for (let i = 0; i < firstArray.length; i++) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }

  // If all elements are equal, return true.
  return true;
}
