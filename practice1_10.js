function practice() {
    return "anonymous function"
}

const practice2 = function() {

    let v1 = "outer variable"
    function inner() {
        let v2 = "inner variable"
        return [v1,v2]
    }

    return [inner(), v1,v2]
}

const p2 = function() {

    let v1 = "outer variable"
    const inner = () => v2 = "inner variable"

    return [inner(), v1,v2]
}

const practice3 = () => {
    return "fat arrow function method"
}
console.log(practice2())
