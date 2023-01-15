import Chance from "chance";

//задание 1

let planets = [
    {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
    {planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
    {planet: "Earth", radius: 6378, density: 5.52, distance: 1},
    {planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
    {planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
    {planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
    {planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
    {planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07}
  ]
  
  function printPlanet() {
  for (let indexValue of planets.entries()) {
    console.log(indexValue);
  }
  }
  
  //задание 2

  let planetsWithSolarSystem = planets.map(function(el) {
  let o = Object.assign({}, el);
  o.solarSystem = true;
  return o;
  })
   
planetsWithSolarSystem.forEach(planetsWithSolarSystem => {
    console.log(JSON.stringify(planetsWithSolarSystem))
});

//задание 3

let newPlanet = {planet: "SomeNewPlanet", radius: 24764, density: 1.64, distance: 30.07, solarSystem: false};

planetsWithSolarSystem.push(newPlanet);

//задание 4

let sumOfPlanetsRadius = planetsWithSolarSystem.reduce(function (acc, planetsWithSolarSystem) { return acc + planetsWithSolarSystem.radius}, 0);
console.log(sumOfPlanetsRadius); 

// задание 5

const distanceMoreThan5 = planetsWithSolarSystem.filter(planetsWithSolarSystem => planetsWithSolarSystem.distance > 5);

console.log(distanceMoreThan5);

// задание 6

const index = planetsWithSolarSystem.findIndex(function (planetsWithSolarSystem) {
	return planetsWithSolarSystem.planet === 'SomeNewPlanet';
});
if (index > -1) { 
  planetsWithSolarSystem.splice(index, 1); 
}

planetsWithSolarSystem.forEach(planetsWithSolarSystem => {
  console.log(JSON.stringify(planetsWithSolarSystem))
});

//задание 7

let result = planetsWithSolarSystem.map(planetsRadius => ({ value: planetsRadius.radius }));
console.log(result)

const arr = [];
for (const object of result) {
  arr.push(object.value);
}
console.log(arr.sort(function(a, b){return a - b}));

//задание 8

let planetsNames = planetsWithSolarSystem.map(planetsName=> ({ value: planetsName.planet }));

const arrOfPlanetsNames = [];
for (const object of planetsNames) {
  arrOfPlanetsNames.push(object.value);
}

console.log(arrOfPlanetsNames.sort(function(a, b){
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
}));

//задание 9

console.log(arrOfPlanetsNames.length);

//задание 10

