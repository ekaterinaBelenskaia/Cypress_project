import Chance from "chance";

let randomAge = Chance().age();
console.log(randomAge);

// 1 способ

function checkAge(randomAge) {

if (randomAge >= 0 && randomAge <= 12) {
    return "It's a child";
} else if (randomAge >= 13 && randomAge <= 17) {
    return "It's a teen";
} else if (randomAge >= 18 && randomAge <= 65) {
    return "It's an adult";
} else if (randomAge >= 66 && randomAge <= 100) {
    return "It's a senior";
} else {
    return "It's a centerian";
}
}

console.log(checkAge(randomAge));

// 2 способ

function checkAge(randomAge) {
    switch(true) {
        case randomAge >= 0 && randomAge <= 12:
           return "It's a child";
          break;
        case randomAge >= 13 && randomAge <= 17:
            return "It's a teen";
          break;
        case randomAge >= 18 && randomAge <= 65:
            return "It's an adult";
          break;
        case randomAge >= 66 && randomAge <= 100:
            return "It's senior";
          break;  
        default:
            return "It's a centerian";
    }
    }

    console.log(checkAge(randomAge))


//3 способ

let personAge = (randomAge >= 0 && randomAge <= 12) ? "It's a child" :
(randomAge >= 13 && randomAge <= 17) ? "It's a teen" :
(randomAge >= 18 && randomAge <= 65) ? "It's an adult" :
(randomAge >= 66 && randomAge <= 100) ? "It's senior" :
"It's a centerian";

console.log(personAge)