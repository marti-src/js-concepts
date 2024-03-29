// CHAPTER 6: OBJECTS

/*** Creating Objects ***/

/** Object Literals **/
let empty = {}
let point = { x: 1, y: 0 }
let p2 = { x: point.x, y: point.y + 1 }

// when property names include hyphens and spaces, use quotes
let book = {
  "main-title": "JavaScript",
  "sub-title": "the Definitive Guide",
  for: "all audiences",
  author: {
    firstname: "David",
    lastname: "Flanagan"
  }
}


/** Prototypes **/
// console.log(p2.hasOwnProperty('z'))


/** Object.create() **/

// Object.create() creates a new object using its first argument as the prototype of that object:
let o1 = Object.create({ x: 1, y: 2 })
// console.log(o1.x + o1.y)
// console.log(o1)

// the example below inherits no props or methods (not even basic methods, like toString())
let o2 = Object.create(null)
// console.log(o2)

// creates an ordinary empty object
let o3 = Object.create(Object.prototype)
// console.log(o3)


/*** Querying and Setting Properties ***/
const book2 = {
  author: 'Marti McDee',
  title: 'Coping with Excellence',
  published: true
}

// console.log(
//   book2['author'],
//   book2.title
// )


/** Objects as Associative Arrays **/
function addstock(portfolio, stockname, shares) {
  portfolio[stockname] = shares
}

const cryptoStonks = {
  atom: 121.014,
  btc: 2.12,
}

addstock(cryptoStonks, 'eth', 10.5)
// console.log(cryptoStonks)

function computeValue(portfolio) {
  let total = 0.0
  for (let stock in portfolio) {
    let shares = portfolio[stock]
    let price = getQuote(stock)
    total += shares * price
  }

  return total.toFixed(2)
}

function getQuote(stock) {
  switch (stock) {
    case 'atom':
      return 3.96
    case 'btc':
      return 11_075
    case 'eth':
      return 2025
  }
}

// console.log(computeValue(cryptoStonks))


/** Inheritance **/

const o = {}
o.x = 4
// console.log(o.x)
o.x = 'hi'
// console.log(o.x)

const obj1 = {
  r: 5
}
const b1 = Object.create(obj1)
// console.log(obj1 === b1) //false
b1.x = 1; b1.y =1
b1.r = 2
// console.log(obj1.r)  // 5


/** Property Access Errors **/
const novel = {
  title: "Robot Zombie Vampyre Ninja",
  author: {
    firstname: "Marti",
    lastname: "Mcdee"
  },
  year: "TBA"
}

console.log(novel.subtitle) // undefined: property doesn't exist

// let len = novel.subtitle.length // TypeError: Cannot read properties of undefined (reading 'length')

// A verbose and explicit technique
// let len = undefined
// if(novel) {
//   if(novel.subtitle) {
//     len = novel.subtitle.length
//   }
// }

novel.subtitle = "Vol.3: The Reckoning"

let len = novel?.subtitle?.length
console.log(len)  // 20
