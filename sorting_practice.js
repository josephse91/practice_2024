
const cArr = (max = 30,min = 5) => {
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
    for (sort in sortfuncs) {
        let sortType = sortfuncs[sort]
        console.time(sort)
        let arr = sortType(cArr())
        console.timeEnd(sort)
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

var sorts = {
    bubblesort1: bubbleSort,
    bubblesort2: bubbleSort,
    bubblesort3: bubbleSort
}

sortTime(sorts);