
const cArr = (max = 5000,min = 100) => {
    var upperLength = Math.floor(Math.random() * max)
    var lowerLength = Math.floor(Math.random() * min)
    
    var arrLength1 = upperLength > (lowerLength && min) ? upperLength - lowerLength : min;

    // Creating an array
    var arr1 = new Array(arrLength1).fill(0,0,arrLength1).map(() => { 
        return Math.floor(Math.random() * 10000)
    });

    return arr1
}

const totalTime = (array,label) => {
    console.log("sorts: ",array,"\n length: ",array.length)
    console.time(label)
    array
    console.timeEnd(label)
    return "complete"
}

// totalTime(createArray(20), "Create Array")

const sortTime = (sortfuncs) => {
    var arr1 = cArr()
    for (sort in sortfuncs) {
        let arrTest = [...arr1];
        let sortType = sortfuncs[sort]
        console.time(sort)
        // let start = performance.now();
        let arr = sortType(arrTest)
        // let end = performance.now()
        console.timeEnd(sort)
        // console.log("execution time: ",end - start, "ms \n",sort,": ", arr)
        console.log(sort,": ", arr)
    }
    
    return "complete"
}

const bubbleSort = array => {
    let last = array.length - 1;
    let test = 1;
    let numSwaps = 0

    while(test === 1 && last > 0) {
        test = 0
        
        for(let i = 0; i < last; i++) {
            if(array[i] >= array[i+1]) {
                test = 1;
                [array[i],array[i+1]] = [array[i+1],array[i]];
                numSwaps++
            }
        }
        last--
    }
    console.log("numswaps: ",numSwaps)
    return array
}

const selectionSort = array => {
    var min = array[0];
    let idx = 0, swaps = 0;

    for(let bottom = 0; bottom < array.length; bottom++) {
        min = array[bottom]
        for(let i=bottom; i < array.length; i++) { 
            if(array[i] <= min) {
                min = array[i];
                idx = i;
            }
        }
        [array[bottom], array[idx]] = [array[idx], array[bottom]];
        swaps++
    }
    
    console.log("number of swaps: ", swaps)
    return array
}

const insertionSort = array => {
    var swaps = 0;

    for(let i = 0; i < array.length; i++) {
        // var target = i
        for(let j = i - 1; j >= 0; j--) {
            if(j < 0) continue
            if(array[j+1] < array[j]) {
                [array[j], array[j+1]] = [array[j+1],array[j]];
                swaps++;
            } else {
                break
            }
        }
    }
    console.log("Insertion Sort Swaps: ", swaps)
    return array;
}
function merge(array1, array2) {

    let sortedArray = []
    while(array1.length || array2.length) {
        if(array1[0] <= array2[0] || array2.length === 0) {
            let num = array1.shift();
            sortedArray.push(num);
        } else {
            let num = array2.shift();
            sortedArray.push(num);
        }
    }
    return sortedArray;
}

function mergeSort(array) {
    if (array.length === 0 || array.length === 1) return array

    let midpoint = Math.floor(array.length / 2)
    let leftArray = array.slice(0,midpoint)
    let rightArray = array.slice(midpoint)

    return merge(mergeSort(leftArray), mergeSort(rightArray))
}

const revisedMerge = (leftArr,rightArr) => {
    var holder = [];
    var sortedArr = [];

    while(leftArr.length || rightArr.length) {
        let largest
        if(!rightArr.length) {
            largest = leftArr.pop();
            holder.push(largest)
            continue
        }
        if(!leftArr.length) {
            largest = rightArr.pop();
            holder.push(largest);
            continue
        }

        if(leftArr[leftArr.length - 1] >= rightArr[rightArr.length - 1]) {
            largest = leftArr.pop()
        } else {
            largest = rightArr.pop();
        }
        //console.log(leftArr,rightArr,largest)
        holder.push(largest)
    }

    while(holder.length) {
        let value = holder.pop();
        sortedArr.push(value);
    }

    return sortedArr;

}
const revisedMergeSort = array => {
    if(array.length <= 1) return array

    var midPointIdx = Math.floor(array.length / 2);
    var left = array.slice(0,midPointIdx)
    var right = array.slice(midPointIdx)

    return revisedMerge(revisedMergeSort(left),revisedMergeSort(right))
}

const quickSort = array => {
    // Establishes the base case of the sorted arrays
    if (array.length <= 1) return array

    // Declare the pivot which will be the first element. If the data is already sorted, it may be better to make this a random element
    let pivot = array.pop();
    // It is important that the pivot is popped because if there are the same elements, there will never be a way to reduce the array to one element
    let leftArray = array.filter(ele => ele <= pivot);
    let rightArray = array.filter(ele => ele > pivot);

    return [...quickSort(leftArray), pivot, ...quickSort(rightArray)]
}

const radixSort = array => {
    var bucket = new Array(10).fill(new Array());
    var k = 0, maxDigits = 1;

    while(maxDigits > k) {
        //console.log("k: ",k,"maxDigit: ", maxDigits, maxDigits <= k)
        for(let i = 0; i < array.length; i++) {
            var numStr = array[i].toString();
            var digits = numStr.length;
            if(!k) {
                if(digits > maxDigits) {
                    maxDigits = digits;
                }
            }
            var digit = digits - 1 - k >= 0 ? Number(numStr[digits - 1 - k]) : 0;
            bucket[digit].unshift(array[i]);
        }
        // console.log("k: ",k,"maxDigit: ", maxDigits, maxDigits <= k)
        //array = [];
        for(let j = 0; j < bucket.length; j++) {
            var bucketEle = bucket[j];
            while(bucketEle[j].length) {
                let value = bucketEle.pop()
                array.push(value);
            }
        }
        k++
    }
    return array;
}

var sorts = {
    bubblesort1: bubbleSort,
    bubblesort2: bubbleSort,
    bubblesort3: bubbleSort,
    selectionSort1: selectionSort,
    insertionSort1: insertionSort,
    mergeSort2: revisedMergeSort,
    mergeSort1: mergeSort,
    quickSort1: quickSort,
    radixSort1: radixSort
}

sortTime(sorts);
// console.log(revisedMergeSort([5,66,2,10,52,33,100,22]))
//console.log(revisedMerge([4,14,3634,53,4,25,73],[24,235,88,535,85,9,115]))
// console.log(radixSort(cArr()))
let arr = [4,2,6,3,7,5,2]