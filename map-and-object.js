//задание 1

let planetsArray = [
	{planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
	{planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
	{planet: "Earth", radius: 6378, density: 5.52, distance: 1},
	{planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
	{planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
	{planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
	{planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
	{planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07}
]

const planetsMap = new Map();
planetsArray.forEach((obj) => {
	planetsMap.set(obj.planet,  {radius: obj.radius, density: obj.density, distance: obj.distance})
}
);

console.log(planetsMap);

  //задание 2

planetsMap.forEach((value, key) => {
	console.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '))
}) 
 
 //задание 3

console.log(planetsMap.get("Saturn"))

 //задание 4

console.log(planetsMap.size)
 
 //задание 5

let mercurySet = new Set(["Mercury", "Not Mercury"]);
console.log(mercurySet)

function isPlanetExisting(mercurySet, planetsMap) {
	let ret = false
	for (let value of mercurySet) {
		if (planetsMap.has(value)) {
			ret = true;
			break;
		}
	}
	return ret
}
console.log(isPlanetExisting(mercurySet, planetsMap));

// задание 6

console.log(planetsMap.delete("Uranus"));
console.log(planetsMap.has("Uranus"));

// задание 7

const newPlanetMap = new Map();
newPlanetMap.set("Pluton", {radius: 1183, density: 1.88, distance: 3.1});
console.log(newPlanetMap.has("Pluton"));

const mergedMap = new Map([[planetsMap, newPlanetMap]]);

console.log("planetsMap - ", planetsMap);
console.log("newPlanetMap - ", newPlanetMap);
console.log("MergedMap - ", mergedMap);

// задание 8

let planet = {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395}

for (const [key, value] of Object.entries(planet)) {
	console.log(`${key}: ${value}`);
  }
  