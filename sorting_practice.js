
const cArr = (max = 1000,min = 100) => {
    var upperLength = Math.floor(Math.random() * max)
    var lowerLength = Math.floor(Math.random() * min)
    
    var arrLength1 = upperLength > (lowerLength && min) ? upperLength - lowerLength : min;

    // Creating an array
    var arr1 = new Array(arrLength1).fill(0,0,arrLength1).map(() => { 
        return Math.floor(Math.random() * 100)
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
        let sortType = sortfuncs[sort]
        console.time(sort)
        // let start = performance.now();
        let arr = sortType(arr1)
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

    for(let bottom = 0; bottom < array.length - 1; bottom++) {
        idx = bottom;
        for(let i=bottom; i < array.length; i++) { 
            if(array[i] <= min) {
                min = array[i];
                idx = i
            }
        }
        array[bottom], array[idx] = array[idx], array[bottom];
        swaps++
    }
    
    console.log("number of swaps: ", swaps)
    return array
}

const insertionSort = array => {
    var swaps = 0;

    for(let i = 0; i < array.length - 1; i++) {
        for(let j = i - 1; j >= 0; j--) {
            if(j < 0) break

            var target = i
            if(array[target] >= array[j]) {
                array[i], array[j] = array[j],array[i];
                swaps++;
                target--;
            } else break 
        }
    }
    console.log("Insertion Sort Swaps: ", swaps)
    return array;
}

var sorts = {
    bubblesort1: bubbleSort,
    bubblesort2: bubbleSort,
    bubblesort3: bubbleSort,
    selectionSort1: selectionSort,
    insertionSort1: insertionSort
}

sortTime(sorts);