import Chance from "chance";
import { isSuperSet, union, intersection, difference } from "../utils/helper.js"

let chance = Chance();

//задание 1
// вариант с объявлением сразу 
let currencySet = new Set(["EUR","BYN","GBP", "PLN"]);
console.log(currencySet)
//вариант с созданием пустого множества

let currencySet2 = new Set();

currencySet2.add("EUR");
currencySet2.add("BYN");
currencySet2.add("PLN");
console.log(currencySet2)

console.log(currencySet, 'test')

// задание 2

// вариант c let of

for (let currency of currencySet) console.log(currency);

// вариант с forEach

currencySet.forEach(currency => {
    console.log(currency)
});


//задание 3

currencySet.add("USD");
console.log(currencySet)
currencySet.add("EUR");
console.log(currencySet)
currencySet.add("RUB").add("CNY");
console.log(currencySet)
for (let currency of currencySet) console.log(currency);

//задание 4
console.log("Set has a value of USD:"+ currencySet.has("USD"));
currencySet.delete("USD");
console.log("Set has a value of USD:"+ currencySet.has("USD"));


// задание 5

let array = Array.from(currencySet);
console.log(array)
console.log(chance.pickone(array));
console.log(chance.pickset(array, 3));

console.log(currencySet.size);
let random = chance.integer({min: 1, max: currencySet.size});
console.log(chance.pickset(array, random));

//задание 6

let setA = new Set(["USD", "CZK", "INR"]);
let setB = new Set(["CNY", "AMD", "AUD", "BGN"]);
let setC = new Set(["DKK", "HUF", "JPY", "KGS", "RON", "TRY"]);

console.log(isSuperSet(setA, setB), 1); 
     
console.log(union(setA, setC), 2); 

console.log(intersection(setA, setC), 3);

console.log(difference(setA, setC), 4);
