// Chapter 8: Functions

// "use strict"

/* Function Declarations */

// print the name and value of each property of o. Return undefined
function printProps(o) {
  for (p in o) {
    // console.log(`${p}: ${o[p]}\n`)
  }
}

const myObject = {
  name: 'David',
  title: 'l33tc0d3r',
  sex: 'yes, please :)'
}

// printProps(myObject)



var factorial = function f(x) {
  if (x <= 1) return 1
  return x * f(x - 1)
}

// console.log(factorial(4))

// console.log(y)

var y = 40

// defining function within block scope
function Foo() {
  // console.log(candy); // undefined
  if (true) {
    var candy = function () {
      // console.log(9);
    }
    candy();
  }

  // console.log(candy);
  candy();
}

// Foo()


/* Function Expressions */
const square = function (x) {
  return x * x
}

let tenSquared = (function (x) { return x * x }(10))
// console.log(tenSquared)


/* Arrow Functions */
const sum = (x, y) => (x + y)
// console.log(sum(10, 12))

const constantFunc = _ => (33)
// console.log(constantFunc())

// make a copy of array with null elements removed
const arr = [1, null, 2, 3]

let filtered = arr.filter(x => x !== null)
// console.log(`filtered array: ${filtered}`)

let squares = filtered.map(x => x * x)
// console.log(`squared elems: ${squares}`)

/* Arrow functions do not have a prototype property, which means that they cannot be used as constructor functions for
 new classes */


/* Nested Functions */
function highOnPotenuse(a, b) {
  function square(x) { return x * x }
  return Math.sqrt(square(a) + square(b))
}

// console.log(highOnPotenuse(3, 4))


/** Invoking Functions **/

/* Function Invocation */
const sum1 = (x, y) => {
}

const x1 = 4, x2 = 5, y1 = 7, y2 = 3
// console.log(sum1?.(x1 + x2, y1 + y2))

const strict = (function () { return !this }())
// console.log(`strict mode: ${strict}`)


/* Method Invocation */
const calculator = {
  operand1: 1,
  operand2: 2,
  add() {
    this.result = this.operand1 + this.operand2
  }
}

calculator.add()
// console.log(calculator.result)

calculator.operand1 = 15
calculator.add()
// console.log(typeof calculator.result.toString().toUpperCase())
// console.log(typeof calculator.result)

// 'this' value of f() method is the global object or undefined
let o = {
  m: function () {
    let self = this
    this === o // => "true"
    return f()

    function f() {
      this === o // "false": 'this' is global or undefined
      self === 0 // "true": self is the outer 'this' value
      return this
    }
  }
}

// console.log(o.m())

// 'this' value of f() method is the value of 'this' outside the object
// the inheritance goes all the way down
let obj4 = {
  m: function () {
    let self = this
    // console.log(this === obj4)  // true 

    const f = () => {
      // console.log(this === obj4)  // true

      const g = () => {
        // console.log(this === obj4)  // true

        const h = () => {
          // console.log(this === obj4)  // true
        }
        h()
      }
      g()
    }
    // function implicity invoked on this object
    const bound = (function () {
      // console.log(`bound func: ${obj4 === this}`)
    }).bind(this)

    f()
    bound()
  }
}

obj4.m()


/* Constructor Invocation */

// you can omit pair of empty parenthesis in constructor invocations
const obj5 = new Object() // a new global variable is created if keyword not specified (in non-strict mode)
const obj6 = new Object  // strict mode requires a declaration with let, const, or var


/* Implicit Function Invocation */
const person = {
  name: 'David',
  getName: function () {
    // console.log(this)

    ; (() => {
      // console.log('inner func', this)
    })()

  }
}

const personName = person.getName
personName()

const highlight = (strings, ...values) => {
  let str = ''
  strings.forEach((string, i) => {
    str += string + (values[i] || '')
  });

  return str
}

const noun = 'breath'
const noun2 = 'cat food'
const sentence = highlight`My cat's ${noun} smells like ${noun2}.`
// console.log(sentence)


/** Function Arguments and Parameters **/

/* Optional Parameters and Defaults */

// When a function is invoked with fewer args than declared params, the additional params are set to their
// default values ('undefined' - unless otherwise specified)

function getPropertyNames(o, a) {
  a = a || []
  for (let property in o) a.push(property)
  return a
}

let obj7 = { x: 1 }, p = { y: 2, z: 3 }
let a = getPropertyNames(obj7)
// console.log(getPropertyNames(p, a))

// for functions with multiple params, you can use the value of a previous param to define the default value
// of params that follow it
const rectangle = (width, height = width * 2) => ({ width, height })
// console.log(rectangle(3))


/* Rest Parameters and Variable Length Arguments */
function max(first = -Infinity, ...rest) {
  let maxValue = first  // start by assuming the first arg is the largest

  for (let n of rest) {
    if (n > maxValue) maxValue = n
  }

  return maxValue
}

// console.log(max(1, 10, 20, 350, 9, 37, 351, 5))

/* The Arguments Object */

// used before es6, in place of the ...rest param
function max(x) {
  let maxValue = -Infinity

  // loop through the args, looking for, and storing the largest
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > maxValue) maxValue = arguments[i]
  }

  return maxValue
}

// console.log(max(1, 10, 20, 350, 9, 37, 351, 5))


/*  The Spread Operator for Function Calls */
let numbers = [5, 2, 10, -1, 9, 100, 1]
Math.min(...numbers)  // => -1

const arr7 = [2, 4, 6, 8]
// console.log([1, 3, [...arr7], 5, 7])

// This function takes a function and returns a wrapped version (for testing)
function timed(f) {
  return function (...args) {
    // console.log(`Entering function ${f.name}...`)
    let startTime = Date.now()
    try {
      // Pass all of our args to the wrapped function
      return f(...args)
    } finally {
      // print elapsed time
      // console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`)
    }
  }
}

// Compute the sum of the numbers between 1 and n by brute force
function benchmark(n) {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }

  return sum
}

// Now invoke the timed version of the test func
timed(benchmark)(1000000)


/* Destructuring Function Arguments Into Parameters */

// Add two vectors
function vectorAdd([x1, y1], [x2, y2]) {
  return [x1 + x2, y1 + y2]
}

// console.log(vectorAdd([1, 2], [3, 4]))

// Destructuring the params of an object

// Multiply the vector [x, y] by a scalar value
function vectorMultiply({ x, y }, scalar) {
  return { x: x * scalar, y: y * scalar }
}

// console.log(vectorMultiply({ x: 1, y: 2 }, 2))

function arrayCopy({ from, to = from, n = from.length, fromIndex = 0, toIndex = 0 }) {
  let valuesToCopy = from.slice(fromIndex, fromIndex + n)
  to.splice(toIndex, 0, ...valuesToCopy)
  return to
}

let a1 = [1, 2, 3, 4, 5], b1 = [9, 8, 7, 6, 5]
// console.log(arrayCopy({ from: a1, n: 3, to: b1, toIndex: 4 }))

// Multiply the vector {x,y} or {x,y,z} by a scalar value, retain other props
function vectorMultiply1({ x, y, z = 0, ...props }, scalar) {
  return { x: x * scalar, y: y * scalar, z: z * scalar, ...props }
}

// console.log(vectorMultiply1({ x: 1, y: 2, w: -1 }, 2))


/* Argument Types */

// Performing Type Checking

// return the sum of the elements an iterable object 'a', the elements of 'a' must all be numbers.
function sum2(a) {
  let total = 0
  for (let element of a) {
    if (typeof element !== "number") {
      throw new TypeError("sum(): elements must be numbers")
    }
    total += element
  }

  return total
}

console.log(
  // sum2([1, 2, 3]),
  // sum2(1, 2, 3),
  // sum2([1, "a", 3])
)


/** Functions As Values **/

// Example 8-1: Using functions as data
function add(x, y) { return x + y }
function subtract(x, y) { return x - y }
function multiply(x, y, ...rest) {
  if (y == null) return x
  if (!rest.length) { return x * y }

  let z = 1
  rest.forEach(num => z *= num)

  return x * y * z
}

function divide(x, y) { return x / y }

const funcArr = [add, subtract, multiply, divide]
// console.log(funcArr.sort())

// console.log(
//   multiply(4)
// )

const operators = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => x / y,
  pow: Math.pow
}

// This function takes the name of an operator, looks up that operator in the object, and then invokes it on the
// supplied operands.
function operate2(operation, operand1, operand2) {
  if (typeof operators[operation] === "function") {
    return operators[operation](operand1, operand2)
  }
  else throw "unknown operator"
}

// console.log(
//   operate2("add", "hello", operate2("add", " ", "world")), '\n',
//   operate2("pow", 10, 2),
// )


/** Defining Your Own Function Properties **/
uniqueInteger.counter = 0

// This function returns a different integer each time it is called
// It uses a property of itself to remember the next value to be returned
function uniqueInteger() {
  return uniqueInteger.counter++
}

// console.log(uniqueInteger())
// console.log(uniqueInteger())

// Compute factorials and cache results as properties of the function itself
function Factorial1(n) {
  if (Number.isInteger(n) && n > 0) {
    if (!(n in Factorial1)) {
      Factorial1[n] = n * Factorial1(n - 1)
    }

    return Factorial1[n]
  } else {
    return NaN
  }
}

// console.log(
//   Factorial1[1] = 1,
//   Factorial1(6),
//   Factorial1[5]
// )


/** Functions as Namespaces **/

// Simulating Namespace with object
const bestSellersSlider = {
  get_products: function () {
    console.log(this.products.join('\n').toString())
  }
}

bestSellersSlider.products = ['product 1', 'product 2', 'product 3']
bestSellersSlider.interval = 3000

bestSellersSlider.get_products()


/*** Closures ***/
let uniqueInteger1 = (function () {
  let counter = 0
  return () => { return counter++ }
})()

console.log(
  uniqueInteger1(),
  uniqueInteger1(),
  uniqueInteger1(),
  uniqueInteger1()
)

// Private variables via Nested Functions
function counter() {
  let n = 0
  return {
    count: function () { return n++ },
    reset: function () { n = 0 }
  }
}

let c = counter(), d = counter()

const arr4 = [1, 2, 3]
const e = arr4
const f = arr4
// console.log(e === f)
// console.log(c, d)

// console.log(
//   c.count(),
//   d.count(),
// )

c.reset()

// console.log(
//   c.count(),
//   d.count(),
// )

// combining closure technique with property getters and setters
function counter1(n) {
  return {
    get count() { return n++ },
    set count(m) {
      if (m > n) n = m
      else throw Error('Count can only be set to a larger value, bahahaha!')
    }
  }
}

let c1 = counter(1000)

function addPrivateProp(o, name, predicate) {
  let value

  o[`get${name}`] = function () { return value }
  o[`set${name}`] = function (v) {
    if (predicate && !predicate(v)) {
      throw new TypeError(`set${name}: invalid value ${v}`)
    } else {
      value = v
    }
  }
}


let person1 = {}

addPrivateProp(person1, "Name", x => typeof x === 'string')

person1.setName('David Martinez')
console.log(person1.getName())
// person1.setName(0)