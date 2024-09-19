export function getInsertionSortAnimations(array) {
  // Create an empty array to store animations.
  let animations = [];

  // Create a copy of the input array to avoid modifying the original.
  let auxillaryArray = array.slice();

  // Perform insertion sort on the copy and store animations.
  insertionSort(auxillaryArray, animations);

  // Verify if the sorting algorithm works correctly by comparing the sorted copy with the JavaScript-sorted array.
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log("Sort works correctly?", arraysAreEqual(javaScriptSortedArray, auxillaryArray));

  // Return the animations and the sorted copy of the array.
  return [animations, auxillaryArray];
}

function insertionSort(auxillaryArray, animations) {
  const N = auxillaryArray.length;

  // Iterate through the array, starting from the second element.
  for (let i = 1; i < N; i++) {
    // Extract the current element as the key.
    let key = auxillaryArray[i];

    // Start from the previous element and move elements greater than the key one position to the right.
    let j = i - 1;

    animations.push(["comparison1", j, i]);
    animations.push(["comparison2", j, i]);
    while (j >= 0 && auxillaryArray[j] > key) {
      animations.push(["overwrite", j + 1, auxillaryArray[j]]);
      auxillaryArray[j + 1] = auxillaryArray[j];
      j = j - 1;

      // If j is still greater than or equal to 0, add more comparison animations.
      if (j >= 0) {
        animations.push(["comparison1", j, i]);
        animations.push(["comparison2", j, i]);
      }
    }

    // Insert the key at the correct position.
    animations.push(["overwrite", j + 1, key]);
    auxillaryArray[j + 1] = key;
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
