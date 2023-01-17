/*Используя метод age() библиотеки Chance сгенерируйте случайный возраст.
https://chancejs.com/person/age.html
Выведите в консоль, кем является человек с полученным возрастом (возможные варианты child, teen, adult, senior).

Необходимо решить задачу тремя способами:
используя оператор условия if
https://www.w3schools.com/js/js_if_else.asp
используя switch
https://www.w3schools.com/js/js_switch.asp
используя тернарный оператор “?”
https://learn.javascript.ru/ifelse */

import Chance from "chance";

let randomAge = Chance().age();
console.log(randomAge);

// 1 способ

function checkAge() {
    if (randomAge >= 0 && randomAge <= 12) {
    console.log("It's a child")
} else if (randomAge >= 13 && randomAge <= 17) {
    console.log("It's a teen") 
} else if (randomAge >= 18 && randomAge <= 65) {
    console.log("It's an adult")
} else if (randomAge >= 66 && randomAge <= 100) {
    console.log("You are a senior!")
} else {
    console.log("You are a centerian!")
}
}
checkAge(randomAge);

// 2 способ

function checkAge() {
switch(randomAge) {
    case randomAge >= 0 && randomAge <= 12:
        console.log("It's a child");
      break;
    case randomAge >= 13 && randomAge <= 17:
        console.log("It's a teen");
      break;
    case randomAge >= 18 && randomAge <= 65:
        console.log("It's an adult");
      break;
    case randomAge >= 66 && randomAge <= 100:
        console.log("You are senior");
      break;  
}
}
checkAge()

//3 способ

let personAge = (randomAge >= 0 && randomAge <= 12) ? console.log("It's a child") :
(randomAge >= 13 && randomAge <= 17) ? console.log("It's a teen") :
(randomAge >= 18 && randomAge <= 65) ? console.log("It's an adult") :
(randomAge >= 66 && randomAge <= 100) ? console.log("You are a senior!") :
"";