export function getHeapSortAnimations(array) {
  // Create an empty array to store animations.
  let animations = [];

  // Create a copy of the input array to avoid modifying the original.
  let auxillaryArray = array.slice();

  // Perform heap sort on the copy and store animations.
  heapSort(auxillaryArray, animations);

  // Verify if the sorting algorithm works correctly by comparing the sorted copy with the JavaScript-sorted array.
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log("Sort works correctly?", arraysAreEqual(javaScriptSortedArray, auxillaryArray));

  // Return the animations and the sorted copy of the array.
  return [animations, auxillaryArray];
}

function heapSort(auxillaryArray, animations) {
  const N = auxillaryArray.length;

  // Build max heap (rearrange array)
  for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
    heapify(auxillaryArray, N, i, animations);
  }

  // One by one extract an element from heap
  for (let i = N - 1; i > 0; i--) {
    animations.push(["comparison1", 0, i]); // Color change for comparison
    animations.push(["comparison2", 0, i]); // Color change for comparison
    animations.push(["swap", 0, auxillaryArray[i]]);
    animations.push(["swap", i, auxillaryArray[0]]);
    swap(auxillaryArray, 0, i);
    heapify(auxillaryArray, i, 0, animations);
  }
}

function heapify(auxillaryArray, N, i, animations) {
  let largest = i; // Initialize largest as root
  let left = 2 * i + 1; // left = 2*i + 1
  let right = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (left < N && auxillaryArray[left] > auxillaryArray[largest]) {
    animations.push(["comparison1", left, largest]); // Color change for comparison
    animations.push(["comparison2", left, largest]); // Color change for comparison
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < N && auxillaryArray[right] > auxillaryArray[largest]) {
    animations.push(["comparison1", right, largest]); // Color change for comparison
    animations.push(["comparison2", right, largest]); // Color change for comparison
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    animations.push(["swap", i, auxillaryArray[largest]]);
    animations.push(["swap", largest, auxillaryArray[i]]);
    swap(auxillaryArray, i, largest);
    heapify(auxillaryArray, N, largest, animations);
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
