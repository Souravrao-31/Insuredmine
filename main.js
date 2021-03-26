// const csv = require('csv-parser')
// const fs  = require('fs')
// const results = [];

// fs.createReadStream('data-sheet.csv')
//    .pipe(csv({}))
//    .on('data', (data) => results.push(data))
//    .on('end', () => {
//        console.log(results);
//    });


const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

const url = process.env.URL



csvtojson()
  .fromFile("data-sheet.csv")
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("tododb")
          .collection("Agent, User, User's Account, LOB, Carrier, Policy")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });