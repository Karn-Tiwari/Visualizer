export function getQuickSortAnimations(array) {
  // Create an empty array to store animations.
  let animations = [];

  // Create a copy of the input array to avoid modifying the original.
  let auxillaryArray = array.slice();

  // Perform quick sort on the copy and store animations.
  quickSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);

  // Verify if the sorting algorithm works correctly by comparing the sorted copy with the JavaScript-sorted array.
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log("Sort works correctly?", arraysAreEqual(javaScriptSortedArray, auxillaryArray));

  // Return the animations and the sorted copy of the array.
  return [animations, auxillaryArray];
}

function quickSort(auxillaryArray, startIndex, endIndex, animations) {
  // Base case: If the subarray has less than two elements, it's already sorted.
  if (startIndex < endIndex) {
    // Partition the array around a pivot element and get the pivot index.
    let pivotIndex = partitionArray(auxillaryArray, startIndex, endIndex, animations);

    // Recursively sort the subarrays to the left and right of the pivot.
    quickSort(auxillaryArray, startIndex, pivotIndex - 1, animations);
    quickSort(auxillaryArray, pivotIndex + 1, endIndex, animations);
  }
}

function partitionArray(auxillaryArray, startIndex, endIndex, animations) {
  // Choose a random pivot element and swap it with the last element.
  let pivotIndex = randomIntFromInterval(startIndex, endIndex);

  animations.push(["comparison1", pivotIndex, endIndex]);
  animations.push(["swap", pivotIndex, auxillaryArray[endIndex]]);
  animations.push(["swap", endIndex, auxillaryArray[pivotIndex]]);
  animations.push(["comparison2", pivotIndex, endIndex]);
  swap(auxillaryArray, pivotIndex, endIndex);

  // Initialize the lessTailIndex to the startIndex.
  let lessTailIndex = startIndex;

  // Iterate through the array, comparing elements with the pivot and swapping if necessary.
  for (let i = startIndex; i < endIndex; ++i) {
    animations.push(["comparison1", i, endIndex]);
    animations.push(["comparison2", i, endIndex]);
    if (auxillaryArray[i] <= auxillaryArray[endIndex]) {
      animations.push(["comparison1", i, lessTailIndex]);
      animations.push(["swap", i, auxillaryArray[lessTailIndex]]);
      animations.push(["swap", lessTailIndex, auxillaryArray[i]]);
      animations.push(["comparison2", i, lessTailIndex]);
      swap(auxillaryArray, i, lessTailIndex);
      lessTailIndex++;
    }
  }

  // Swap the pivot element with the element at the lessTailIndex.
  animations.push(["comparison1", lessTailIndex, endIndex]);
  animations.push(["swap", endIndex, auxillaryArray[lessTailIndex]]);
  animations.push(["swap", lessTailIndex, auxillaryArray[endIndex]]);
  animations.push(["comparison2", lessTailIndex, endIndex]);

  swap(auxillaryArray, lessTailIndex, endIndex);

  // Return the pivot index.
  return lessTailIndex;
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

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
