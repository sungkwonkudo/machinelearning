//https://hackernoon.com/machine-learning-with-javascript-part-2-da994c17d483

// Concluded unceremoniously due to dataset being slightly different than the on that was used. 


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
    
csv({noheader: true, headers: names})
    .fromFile(csvFilePath)
    .on('json', (jsonObj)=>{
        data.push(jsonObj);
    })
    .on('done',(error)=>{
        separationSize = 0.7 * data.length;
        data = shuffleArray(data);
        dressData();
    });

function shuffleArray(array){
    for(var i = array.length - 1; i > 0; i--){
        var j = Math.floor(Math.random()* (i+1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function dressData() {

    /**
    * There are three different types of Iris flowers
    * that this dataset classifies.
    *
    * 1. Iris Setosa (Iris-setosa)
    * 2. Iris Versicolor (Iris-versicolor)
    * 3. Iris Virginica (Iris-virginica)
    *
    * We are going to change these classes from Strings to numbers.
    * Such that, a value of type equal to
    * 0 would mean setosa,
    * 1 would mean versicolor, and
    * 3 would mean virginica
    */
    let types = new Set();
    
    data.forEach((row)=>{
        types.add(row.type);
    });
    
    typesArray = [...types];
    
    data.forEach((row)=>{
        let rowArray, typeNumber;
        
        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0,4);
        
        typeNumber = typesArray.indexOf(row.type);
        
        X.push(rowArray);
        y.push(typeNumber);
    });
    
    trainingSetX = X.slice(0, separationSize);
    trainingSetY = y.slice(0, separationSize);
    testSetX = X.slice(separationSize);
    testSetY = y.slice(separationSize);
    
    train();
}

function train(){
    knn = new KNN(trainingSetX, trainingSetY, {k:7});
    test();
}

function test(){
    const result = knn.predict(testSetX);
    const testSetLength = testSetX.length;
    const predictionError = error(result, testSetY);
    console.log(`Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`);
    predict();
}

function error(predicted, expected){
    let misclassifications = 0;
    for(var index = 0; index < predicted.length; index++){
        if(predicted[index] !== expected [index]){
            misclassifications++;
        }
    }
    return misclassifications;
}

function predict() {
    let temp = [];
    prompt.start();
    
    prompt.get(['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'], function(err, result){
        if(!err){
            for (var key in result){
                temp.push(parseFloat(result[key]));
            }
            
            console.log(`With ${temp} -- type = ${knn.predict(temp)}`);
        }
    })
}