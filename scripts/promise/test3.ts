const array1 = [
  {
      "id": 159938,
      "itemId": 652458,
      "contractAddress": "0xCe70EEf5ADaC126C37c8BC0c1228d48B70066d03",
      "editionId": null,
      "tokenId": 6906,
      "itemType": "TOKEN"
  },
  {
      "id": 159937,
      "itemId": 651736,
      "contractAddress": "0xCe70EEf5ADaC126C37c8BC0c1228d48B70066d03",
      "editionId": null,
      "tokenId": 6184,
      "itemType": "TOKEN"
  },
  {
      "id": 159930,
      "itemId": 653973,
      "contractAddress": "0xCe70EEf5ADaC126C37c8BC0c1228d48B70066d03",
      "editionId": null,
      "tokenId": 8421,
      "itemType": "EDITION"
  },
  {
      "id": 159825,
      "itemId": 653973,
      "contractAddress": "0xCe70EEf5ADaC126C37c8BC0c1228d48B70066d03",
      "editionId": null,
      "tokenId": 8421,
      "itemType": "TOKEN"
  },
  {
      "id": 159815,
      "itemId": 651733,
      "contractAddress": "0xCe70EEf5ADaC126C37c8BC0c1228d48B70066d03",
      "editionId": null,
      "tokenId": 6181,
      "itemType": "EDITION"
  },
  {
      "id": 159808,
      "itemId": 652458,
      "contractAddress": "0xCe70EEf5ADaC126C37c8BC0c1228d48B70066d03",
      "editionId": null,
      "tokenId": 6906,
      "itemType": "TOKEN"
  },
  {
      "id": 159805,
      "itemId": 646175,
      "contractAddress": "0xCe70EEf5ADaC126C37c8BC0c1228d48B70066d03",
      "editionId": null,
      "tokenId": 623,
      "itemType": "TOKEN"
  }
]

const editionFilter = array1.filter((value) => {
  return value.itemType == "EDITION";
})
console.log(editionFilter)

const tokenIdMapper = array1.map((v) => {
  return (v.tokenId) + 5;
})
console.log(tokenIdMapper)

const objs = [
  { name: 'yoonha', age: '26' },
  { name: 'yoonha2', age: '27' },
  { name: 'yoonha3', age: '28' },
  { name: 'yoonha4', age: '29' },
  { name: 'yoonha5', age: '30' },
]

let addAges = 0;
for (let i = 0; i < objs.length; i++) {
  addAges = addAges + Number(objs[i].age)
}
console.log(addAges)

const ageFilter = objs.map((value) => {
  if (Number(value.age) >= 29 ) {
    return String(Number(value))
  }
})
console.log(ageFilter)

const addAge = objs.map((v) => String(Number(v.age)+5))
console.log(addAge)

// let sumAge=0;
// for (let i = 0; i<objs.length ; i++) {
//   sumAge = sumAge + Number(objs[i].age)
// }
// console.log(sumAge)
