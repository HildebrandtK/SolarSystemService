interface Planet {
  name: String;
  radius: number; // mean radius in kilometers
  distanceToSun: number; // in kilometers
}

class SolarSystemService {
  private planets: Planet[];

  constructor() {
    this.planets = [
      { name: "Sun", radius: 696340, distanceToSun: 0 },
      { name: "Mercury", radius: 2439.7, distanceToSun: 57909175 },
      { name: "Venus", radius: 6051.8, distanceToSun: 108208930 },
      { name: "Earth", radius: 6371, distanceToSun: 149597870 },
      { name: "Mars", radius: 3389.5, distanceToSun: 227936640 },
      { name: "Jupiter", radius: 69911, distanceToSun: 778412010 },
      { name: "Saturn", radius: 58232, distanceToSun: 1426725400 },
      { name: "Uranus", radius: 25362, distanceToSun: 2870972200 },
      { name: "Neptune", radius: 24622, distanceToSun: 4503443660 },
    ];
  }

  getPlanets(): Planet[] {
    return this.planets;
  }

  updatePlanet(name: string, radius: number, distanceToSun: number): void {
    const planetIndex = this.planets.findIndex((p) => p.name === name);
    if (planetIndex !== -1) {
      this.planets[planetIndex] = { name, radius, distanceToSun };
    } else {
      this.planets.push({ name, radius, distanceToSun });
    }
  }

  getDistanceBetweenPlanets(
    planet1: string,
    planet2: string
  ): number | undefined {
    const p1 = this.planets.find((planet) => planet.name === planet1);
    const p2 = this.planets.find((planet) => planet.name === planet2);
    if (p1 && p2) {
      return Math.abs(p1.distanceToSun - p2.distanceToSun);
    }
    return undefined;
  }

  sortPlanetsByDistanceToPlanet(planet: string): Planet[] {
    const referencePlanet = this.planets.find((p) => p.name === planet);
    if (referencePlanet) {
      return [...this.planets].sort(
        (a, b) =>
          Math.abs(a.distanceToSun - referencePlanet.distanceToSun) -
          Math.abs(b.distanceToSun - referencePlanet.distanceToSun)
      );
    }
    return [];
  }

  sortPlanetsByRadiusAsc(): Planet[] {
    return [...this.planets].sort((a, b) => a.radius - b.radius);
  }

  sortPlanetsByRadiusDsc(): Planet[] {
    return [...this.planets].sort((a, b) => b.radius - a.radius);
  }
}

// Usage

const solarSystem = new SolarSystemService();
console.log("Planets:", solarSystem.getPlanets());

solarSystem.updatePlanet("Pluto", 1188.3, 5906380000);
console.log("Updated Planets:", solarSystem.getPlanets());

const distance = solarSystem.getDistanceBetweenPlanets("Venus", "Uranus");
console.log("Distance between Venus and Uranus:", distance);

const sortedPlanetsByDistanceToPlanet =
  solarSystem.sortPlanetsByDistanceToPlanet("Jupiter");
console.log("Sorted Planets:", sortedPlanetsByDistanceToPlanet);

const sortedPlanetsByRadiusAsc = solarSystem.sortPlanetsByRadiusAsc();
console.log("Sorted Planets by radius ascending:", sortedPlanetsByRadiusAsc);

const sortedPlanetsByRadiusDsc = solarSystem.sortPlanetsByRadiusDsc();
console.log("Sorted Planets by radius descending:", sortedPlanetsByRadiusDsc);
