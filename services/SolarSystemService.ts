import { PlanetData } from "../data/PlanetData";
import { Planet } from "../interfaces/interface";

export class SolarSystemService {
  private readonly planetData: PlanetData;

  constructor() {
    this.planetData = new PlanetData();
  }

  getPlanet(name: string): Planet {
    const planet = this.planetData.getPlanet(name);
    if (!planet) {
      throw new Error(`Planet ${name} not found`);
    }
    return planet;
  }

  getAllPlanets(): Planet[] {
    return this.planetData.getAllPlanets();
  }

  createPlanet(name: string, radius: number, distanceToSun: number): string {
    this.validatePlanetData(radius, distanceToSun);
    if (this.planetData.getPlanet(name)) {
      throw new Error(`Planet ${name} already exists.`);
    }

    const newPlanet: Planet = {
      name,
      radius,
      distanceToSun,
    };

    this.planetData.createPlanet(name, newPlanet);

    return `Planet ${name} succesfully created.`;
  }

  updatePlanet(
    name: string,
    radius: number,
    distanceToSun: number,
    newName?: string
  ): string {
    this.validatePlanetData(radius, distanceToSun);

    if (!this.planetData.getPlanet(name)) {
      throw new Error(`Planet ${name} not found.`);
    }

    this.planetData.deletePlanet(name);

    const updatedPlanet: Planet = {
      name: newName || name,
      radius,
      distanceToSun,
    };
    this.planetData.createPlanet(updatedPlanet.name, updatedPlanet);

    return `Planet ${updatedPlanet.name} succesfully updated.`;
  }

  deletePlanet(name: string): string {
    const planet = this.planetData.getPlanet(name);
    if (!planet) {
      throw new Error(`Planet ${name} not found`);
    }

    this.planetData.deletePlanet(name);

    return `Planet ${name} succesfully deleted.`;
  }

  sortByDistanceToPlanet(
    name: string,
    ascending: boolean = true
  ): Planet[] | Error {
    const referencePlanet = this.planetData.getPlanet(name);
    if (!referencePlanet) {
      throw new Error(`Planet ${name} not found`);
    }

    const sortedPlanets = this.getAllPlanets();
    sortedPlanets.sort(
      (a, b) =>
        Math.abs(a.distanceToSun - referencePlanet.distanceToSun) -
        Math.abs(b.distanceToSun - referencePlanet.distanceToSun)
    );

    return ascending ? sortedPlanets : sortedPlanets.reverse();
  }

  sortByRadius(ascending: boolean = true): Planet[] {
    const sortedPlanets = this.getAllPlanets().sort(
      (a, b) => a.radius - b.radius
    );

    return ascending ? sortedPlanets : sortedPlanets.reverse();
  }

  sortByDistanceToSun(ascending: boolean = true): Planet[] {
    const sortedPlanets = this.getAllPlanets().sort(
      (a, b) => a.distanceToSun - b.distanceToSun
    );

    return ascending ? sortedPlanets : sortedPlanets.reverse();
  }

  getDistanceBetweenPlanets(planet1: string, planet2: string): number | Error {
    const p1 = this.planetData.getPlanet(planet1)?.distanceToSun;
    const p2 = this.planetData.getPlanet(planet2)?.distanceToSun;
    if (p1 && p2) {
      return Math.abs(p1 - p2);
    }

    throw new Error("You have to provide two existing planet names");
  }

  private validatePlanetData(
    radius: number,
    distanceToSun: number
  ): void | Error {
    if (radius <= 0 || distanceToSun <= 0) {
      throw new Error("Radius and distanceToSun must be positive numbers.");
    }
  }
}
