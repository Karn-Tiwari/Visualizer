export function getSelectionSortAnimations(array) {
  // Create an empty array to store animations.
  let animations = [];

  // Create a copy of the input array to avoid modifying the original.
  let auxillaryArray = array.slice();

  // Perform selection sort on the copy and store animations.
  selectionSort(auxillaryArray, animations);

  // Verify if the sorting algorithm works correctly by comparing the sorted copy with the JavaScript-sorted array.
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log("Sort works correctly?", arraysAreEqual(javaScriptSortedArray, auxillaryArray));

  // Return the animations and the sorted copy of the array.
  return [animations, auxillaryArray];
}

function selectionSort(auxillaryArray, animations) {
  const N = auxillaryArray.length;

  // Iterate through the unsorted part of the array.
  for (let i = 0; i < N - 1; i++) {
    // Initialize the minimum index to the current index.
    let minIndex = i;

    // Find the minimum element in the unsorted part of the array.
    for (let j = i + 1; j < N; j++) {
      animations.push(["comparison1", j, minIndex]);
      animations.push(["comparison2", j, minIndex]);
      if (auxillaryArray[j] < auxillaryArray[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first element of the unsorted part.
    animations.push(["swap", minIndex, auxillaryArray[i]]);
    animations.push(["swap", i, auxillaryArray[minIndex]]);
    swap(auxillaryArray, minIndex, i);
  }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}

function arraysAreEqual(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) {
    return false;
  }
  for (let i = 0; i < firstArray.length; i++) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
}
