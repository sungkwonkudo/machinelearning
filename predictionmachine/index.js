const KNN = require('ml-knn');
const csv =  require('csvtojson');
const prompt = require('prompt');
let knn;

const csvFilePath = 'iris.csv'; // Data
const names = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'type'];

let separationSize; // To separate training and test data

let data = [],
    X = [],
    y = [];
    
let trainingSetX = [],
    trainingSetY = [],
    testSetX = [], 
    testSetY = [];
    
