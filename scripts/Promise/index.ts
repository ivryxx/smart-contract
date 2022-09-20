import { readFile, writeFile } from 'fs';

// text.txt를 읽어서 text.json file을 만들어라.
(async () => {
  // // 1번 
  // readFile(`${__dirname}/text.txt`, (err, data) => {
  //   writeFile(`${__dirname}/json.json`, JSON.stringify({ data: data.toString() }), 'utf8', (err) => {});
  // });
  
  // const readFilePromises = new Promise((resolve, reject) => {
  //   readFile(`${__dirname}/text.txt`, (err, data) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     return resolve(data.toString());
  //   });
  // });

  // // 2번
  // readFilePromises
  //   .then((data) => {
  //     writeFile(`${__dirname}/json.json`, JSON.stringify({ data: data }), 'utf8', (err) => { });
  //   })
  //   .catch((err) => { throw err; });

  // // 3번
  // try {
  //   const readData = await readFilePromises;
  //   writeFile(`${__dirname}/json.json`, JSON.stringify({ data: readData }), 'utf8', (err) => { });
  // } catch (err) {
  //   throw err;
  // } finally {
  //   console.log('finally');
  // }

  const readFilePromises_1 = () => new Promise((resolve, reject) => {
    readFile(`${__dirname}/text.txt`, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data.toString());
    });
  });

  const readFilePromises_2 = () => new Promise((resolve, reject) => {
    readFile(`${__dirname}/text_2.txt`, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data.toString());
    });
  });

  const readFilePromises_3 = () => new Promise((resolve, reject) => {
    return reject(new Error());
    // readFile(`${__dirname}/text_3.txt`, (err, data) => {
    //   if (err) {
    //     return reject(err);
    //   }
    //   return resolve(data.toString());
    // });
  });
  
  // const text_1 = await readFilePromises_1();
  // const text_2 = await readFilePromises_2();
  // const text_3 = await readFilePromises_3();
  // const [text_1, text_2, text_3] = await Promise.all([
  //   readFilePromises_1(),
  //   readFilePromises_2(),
  //   readFilePromises_3()
  // ])

  // const text = await Promise.race([
  //   readFilePromises_1(),
  //   readFilePromises_2(),
  //   readFilePromises_3()
  // ]);

  // console.log(text);

  // console.log(text_1);
  // console.log(text_2);
  // console.log(text_3);
})();