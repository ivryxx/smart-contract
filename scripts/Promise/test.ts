import { rejects } from 'assert';
import { readFile, writeFile } from 'fs'
// (() => {
//   const promise1 = Promise.resolve(3);
//   const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
//   const promises = [promise1, promise2];
  
//   Promise.allSettled(promises).
//     then((results) => results.forEach((result) => console.log(result)));
// })();


// Promise.allSettled([
//   Promise.resolve(33),
//   new Promise(resolve => setTimeout(() => resolve(66), 0)),
//   99,
//   Promise.reject(new Error('an error'))
// ])
// .then(values => console.log(values));

// (async () => {
//   const values = await Promise.allSettled([
//     Promise.resolve(33),
//     new Promise(resolve => setTimeout(() => resolve(66), 0)),
//     99,
//     Promise.reject(new Error('an error'))
//   ])
//   console.log(values)
// })();

// const values = await Promise.allSettled([
//   Promise.resolve(33),
//   new Promise(resolve => setTimeout(() => resolve(66), 0)),
//   99,
//   Promise.reject(new Error('an error'))
// ])
// console.log(values)

// Promise.allSettled(promises).
//   then((results) => results.forEach((result) => console.log(result.status)));

// const promise1 = Promise.reject(0);
// const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
// const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

// const promises = [promise1, promise2, promise3];

// Promise.any(promises).then((value) => console.log(value));

// expected output: "quick"

(async () => {
  const promise1 = new Promise((resolve) => setTimeout(resolve, 500, '3'));
  const promise2 = new Promise((resolve) => setTimeout(resolve, 100, '42'));
  const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'foo'));

  const readFilePromise = new Promise((resolve, reject) => {
    readFile(`${__dirname}/test.txt`, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data.toString());
    });
  });

  const result = await readFilePromise;
  const writeFilePromise = new Promise((resolve, reject) => {
    writeFile(`${__dirname}/result.txt`, result as string, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      return resolve('');
    });
  });
  
  writeFilePromise.then((value) => {
    console.log('success!')
  }).catch((reason) => {
    console.log('failed!')
  }).finally(() => {
    console.log('ended!')
  })
})();

// Promise.allSettled([promise1, promise2, promise3, readFilePromise1]).then((values) => {
//   console.log(values)
// })
















































