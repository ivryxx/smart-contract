// // const someArray = [1, 5, 7];
// // const someArrayEntries = someArray.entries();

// // someArrayEntries.toString();           // "[object Array Iterator]"
// // someArrayEntries === someArrayEntries[Symbol.iterator]();    // true

// const example = 'yoonhababo';
// const stringIterator = example[Symbol.iterator]();

// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());
// console.log(stringIterator.next());

// const arr = [1, 2, 3, 4, 5];
// const someArrayEntries = arr.entries();
// console.log(someArrayEntries);
// someArrayEntries.next();

// const entriesToString = someArrayEntries.toString();          
// console.log(entriesToString);
// console.log(someArrayEntries === someArrayEntries[Symbol.iterator]());

// // console.log(someArrayEntries.next());
// console.log(someArrayEntries[Symbol.iterator]().next());
// console.log(someArrayEntries.next());
// console.log(someArrayEntries.next());
// console.log(someArrayEntries.next());
// console.log(someArrayEntries[Symbol.iterator]().next());

// const yieldFunc = (function* () {
//   yield 1;
//   yield 2;
//   yield 3;
// })();

// console.log(yieldFunc[Symbol.iterator]);
// console.log(yieldFunc[Symbol.iterator]().next());
// console.log(yieldFunc[Symbol.iterator]().next());
// console.log(yieldFunc[Symbol.iterator]().next());
// console.log(yieldFunc[Symbol.iterator]().next());
// console.log(yieldFunc[Symbol.iterator]().next());
// console.log(yieldFunc[Symbol.iterator]().next());
// console.log(yieldFunc[Symbol.iterator]().next());

// const array = [1, 2, 3];

// for (let i = 0; i < array.length; i++) {
//   console.log(array[i]);
// }

// for (const i of array) {
//   console.log(i);
// }

// const please = 'yoonhaplease';

// for (const p of please) {
//   console.log(p);
// }

// const obj = {
//   yoonha: 28,
//   yoontaek: 30,
//   keunhan: 34
// }

// console.log(Object.keys(obj));
// console.log(Object.values(obj));






const a = 'fingerlabs';
const stringIterator = a[Symbol.iterator]();

console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());
console.log(stringIterator.next());


const b = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = b[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
