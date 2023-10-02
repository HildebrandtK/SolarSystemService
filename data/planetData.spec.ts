import { PlanetData } from "./PlanetData";

describe("PlanetData", () => {
  let planetData: PlanetData;

  beforeEach(() => {
    planetData = new PlanetData();
  });

  it("should create a planet", () => {
    const planet = {
      name: "Testplanet",
      radius: 1000,
      distanceToSun: 2000,
    };
    planetData.createPlanet(planet.name, planet);
    const retrievedPlanet = planetData.getPlanet(planet.name);
    expect(retrievedPlanet).toEqual(planet);
    planetData.deletePlanet(planet.name);
  });

  it("should not allow creating a planet with the same name", () => {
    const planet = {
      name: "Duplicateplanet",
      radius: 1000,
      distanceToSun: 2000,
    };
    planetData.createPlanet(planet.name, planet);

    expect(() => planetData.createPlanet(planet.name, planet)).toThrowError(
      "Planet 'Duplicateplanet' already exists. Use updatePlanet to modify it."
    );
  });

  it("should update a planet", () => {
    const planet = {
      name: "Testplanet",
      radius: 1000,
      distanceToSun: 2000,
    };
    planetData.createPlanet(planet.name, planet);

    const updatedPlanet = {
      name: "Testplanet",
      radius: 1500,
      distanceToSun: 2500,
    };
    planetData.updatePlanet(planet.name, updatedPlanet);

    const retrievedPlanet = planetData.getPlanet(planet.name);
    expect(retrievedPlanet).toEqual(updatedPlanet);
  });

  it("should not allow updating a non-existent planet", () => {
    const planet = {
      name: "Nonexistentplanet",
      radius: 1000,
      distanceToSun: 2000,
    };

    expect(() => planetData.updatePlanet(planet.name, planet)).toThrowError(
      "Planet Nonexistentplanet not found"
    );
  });

  it("should delete a planet", () => {
    const planet = {
      name: "Testplanet",
      radius: 1000,
      distanceToSun: 2000,
    };
    planetData.createPlanet(planet.name, planet);
    planetData.deletePlanet(planet.name);
    const retrievedPlanet = planetData.getPlanet(planet.name);
    expect(retrievedPlanet).toBeUndefined();
  });

  it("should not allow deleting a non-existent planet", () => {
    const planetName = "Nonexistentplanet";

    expect(() => planetData.deletePlanet(planetName)).toThrowError(
      `Planet ${planetName} not found`
    );
  });
});
