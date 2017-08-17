// Index.js
// Sungkwon Kudo

const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml/SLR; // Simple Linear Regression

const csvFilePath = 'advertising.csv'; // Data
let csvData = [], // Parsed Data
    X = [], // Input
    y=[]; // Output
    
let regressionModel;

csv()
    .fromFile(csvFilePath)
    .on('json',(jsonObj)=> {
        csvData.push(jsonObj);
    })
    .on('done', ()=>{
        dressData();// To get data points from JSON Objects
        performRegression();
    }