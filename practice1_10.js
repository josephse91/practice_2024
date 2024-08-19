var arr1 = [38,25,74,1,76,24,9,35,244,64,55]

const binarySearch = (array,target,low = 0,high = array.length - 1) => {
    if (array[low] > target || array[high] < target) return false
    
    var midIdx = Math.floor(((high - low) / 2)) + low;
    if (array[midIdx] === target) return true;
    if (low > high) return false;

    //console.log(low,high,array[low],array[high],array, midIdx)
    if (target > array[midIdx]) {
        return binarySearch(array,target,midIdx + 1, high);
    } else {
        return binarySearch(array,target,low,midIdx - 1);
    }
}


let sortedArr = arr1.sort((a,b) => {
    return a-b
})

console.log(binarySearch(sortedArr,1))