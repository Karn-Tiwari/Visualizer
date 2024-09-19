export function getMergeSortAnimations(array) {
  // Create an empty array to store animations.
  let animations = [];

  // Create a copy of the input array to avoid modifying the original.
  let auxillaryArray = array.slice();

  // Perform merge sort on the copy and store animations.
  mergeSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);

  // Verify if the sorting algorithm works correctly by comparing the sorted copy with the JavaScript-sorted array.
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log(arraysAreEqual(javaScriptSortedArray, auxillaryArray));

  // Return the animations and the sorted copy of the array.
  return [animations, auxillaryArray];
}

function mergeSort(auxillaryArray, startIndex, endIndex, animations) {
  // Base case: If the subarray has only one element, it's already sorted.
  if (startIndex === endIndex) {
    return;
  }

  // Divide the subarray into two halves.
  const middleIndex = Math.floor((startIndex + endIndex) / 2);

  // Recursively sort the left and right halves.
  mergeSort(auxillaryArray, startIndex, middleIndex, animations);
  mergeSort(auxillaryArray, middleIndex + 1, endIndex, animations);

  // Merge the sorted halves.
  merge(auxillaryArray, startIndex, middleIndex, endIndex, animations);
}

function merge(auxillaryArray, startIndex, middleIndex, endIndex, animations) {
  // Create a temporary array to store the merged elements.
  let sortArray = [];

  // Initialize pointers for the left and right subarrays.
  let i = startIndex;
  let j = middleIndex + 1;

  // Merge the elements from the left and right subarrays into the temporary array.
  while (i <= middleIndex && j <= endIndex) {
    // Compare the elements and add the smaller one to the temporary array.
    animations.push(["comparison1", i, j]); // Color change for comparison
    animations.push(["comparison2", i, j]); // Color change for comparison
    if (auxillaryArray[i] <= auxillaryArray[j]) {
      sortArray.push(auxillaryArray[i++]);
    } else {
      sortArray.push(auxillaryArray[j++]);
    }
  }

  // Copy any remaining elements from the left subarray.
  while (i <= middleIndex) {
    animations.push(["comparison1", i, i]);
    animations.push(["comparison2", i, i]);
    sortArray.push(auxillaryArray[i++]);
  }

  // Copy any remaining elements from the right subarray.
  while (j <= endIndex) {
    animations.push(["comparison1", j, j]);
    animations.push(["comparison2", j, j]);
    sortArray.push(auxillaryArray[j++]);
  }

  // Copy the merged elements back to the original array.
  for (let i = startIndex; i <= endIndex; i++) {
    animations.push(["comparison1", i, i - startIndex]);
    animations.push(["overwrite", i, sortArray[i - startIndex]]);
    animations.push(["comparison2", i, i - startIndex]);
    auxillaryArray[i] = sortArray[i - startIndex];
  }
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
