//Variables are cotainers
var name //this is a declared but uninitialized variable in the global scope
let foo //declared variable that can be changed
const foo //declared variable that can't be changed; constant
const Answer = 42; //const is declared and initialized

// string

let string1 = 'Hello World'
let string2 = 'Hello Hya'
let string3 = new String('Hello World')

//numbers

let myNum = 23089
let myNum2 = 75.46

'1' == 1 //this state is true because of type coersion and loose equality checking
'1' === 1 //this is false because of differing data types
//Boolean

let myBool = true

//Array

let myArray = []
let myArray2 = [42, "bob", myBool, Answer, true]
let secondElement = myArray2[1]
myArray2.push[pizza]
myArray2.unshift["bob"]
//Objects

let minObject = {}

const myCar = {
    make: 'Chevrolet',
    color: 'Red',

}