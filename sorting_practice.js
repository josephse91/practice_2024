var arrLength1 = Math.abs(Math.floor(Math.random() * 20) - Math.floor(Math.random() * 5));

// Creating an array
var arr1 = new Array(arrLength1).fill(0,0,arrLength1).map(() => { 
    return Math.floor(Math.random() * 100)
});

