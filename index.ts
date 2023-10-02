import { SolarSystemService } from "./services/SolarSystemService";

const solarSystem = new SolarSystemService();

console.log("Planets:", solarSystem.getAllPlanets());

console.log("Get Earth:", solarSystem.getPlanet("Earth"));

console.log(solarSystem.createPlanet("Earth2", 222, 333));

console.log(solarSystem.updatePlanet("Mars", 111, 111, "Mars2"));

console.log(solarSystem.deletePlanet("Jupiter"));

console.log("Sorted by radius, descending:", solarSystem.sortByRadius(false));

console.log(
  "Sorted by distance to sun, ascending:",
  solarSystem.sortByDistanceToSun()
);

console.log(
  "Distance between Venus and Uranus:",
  solarSystem.getDistanceBetweenPlanets("Venus", "Uranus")
);

console.log(
  "Sorted by distance to Earth, descending:",
  solarSystem.sortByDistanceToPlanet("Earth", false)
);
