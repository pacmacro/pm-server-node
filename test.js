const obj = { greet: "hi", your: "mom" }
const obj2 = { greet: "hi", your: "dad" }
const contents = { greet: "hi", your: "mo" }
// prettier-ignore
console.log(Object.keys(contents).reduce((previous, current) => previous && obj[current] === contents[current], true))
