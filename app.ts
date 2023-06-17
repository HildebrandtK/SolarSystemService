interface Planet {
  name: string;
  radius: number; // mean radius
  distanceToSun: number; // in millions of kilometers
}

class SolarSystemService {
  private readonly planets: Record<string, Planet>;

  constructor() {
    this.planets = {
      Mercury: { name: "Mercury", radius: 2439.7, distanceToSun: 57.9 },
      Venus: { name: "Venus", radius: 6051.8, distanceToSun: 108.2 },
      Earth: { name: "Earth", radius: 6371, distanceToSun: 149.6 },
      Mars: { name: "Mars", radius: 3389.5, distanceToSun: 227.9 },
      Jupiter: { name: "Jupiter", radius: 69911, distanceToSun: 778.6 },
      Saturn: { name: "Saturn", radius: 58232, distanceToSun: 1433.5 },
      Uranus: { name: "Uranus", radius: 25362, distanceToSun: 2872.5 },
      Neptune: { name: "Neptune", radius: 24622, distanceToSun: 4495.1 },
    };
  }

  getPlanets(): Planet[] {
    return Object.values(this.planets);
  }

  updateOrCreatePlanet(
    name: string,
    radius: number,
    distanceToSun: number,
    newName?: string
  ): void {
    if (newName) {
      delete this.planets[name];
      this.planets[newName] = { name: newName, radius, distanceToSun };
    } else {
      this.planets[name] = { name, radius, distanceToSun };
    }
  }

  getDistanceBetweenPlanets(planet1: string, planet2: string): number | Error {
    const p1 = this.planets[planet1]?.distanceToSun;
    const p2 = this.planets[planet2]?.distanceToSun;
    if (p1 && p2) {
      return Math.abs(p1 - p2);
    }

    throw new Error("You have to provide two existing planet names");
  }

  sortByDistanceToPlanet(
    planet: string,
    ascending: boolean = true
  ): Planet[] | Error {
    const referencePlanet = this.planets[planet];
    if (referencePlanet) {
      const sortedPlanets = this.getPlanets().sort(
        (a, b) =>
          Math.abs(a.distanceToSun - referencePlanet.distanceToSun) -
          Math.abs(b.distanceToSun - referencePlanet.distanceToSun)
      );

      return ascending ? sortedPlanets : sortedPlanets.reverse();
    }
    throw new Error("Given planet does not exist");
  }

  sortByRadius(ascending: boolean = true): Planet[] {
    const sortedPlanets = this.getPlanets().sort((a, b) => a.radius - b.radius);

    return ascending ? sortedPlanets : sortedPlanets.reverse();
  }

  sortByDistanceToSun(ascending: boolean = true): Planet[] {
    const sortedPlanets = this.getPlanets().sort(
      (a, b) => a.distanceToSun - b.distanceToSun
    );

    return ascending ? sortedPlanets : sortedPlanets.reverse();
  }
}

// Usage

const solarSystem = new SolarSystemService();

console.log("Planets:", solarSystem.getPlanets());

solarSystem.updateOrCreatePlanet("Earth", 10, 10);
console.log("Updated Planets:", solarSystem.getPlanets());

solarSystem.updateOrCreatePlanet("A New Earth", 100, 100);
console.log("Updated Planets:", solarSystem.getPlanets());

solarSystem.updateOrCreatePlanet("Saturn", 100, 100, "Super Saturn");
console.log("Updated Planets:", solarSystem.getPlanets());

const distance = solarSystem.getDistanceBetweenPlanets("Venus", "Uranus");
console.log("Distance between Venus and Uranus:", distance);

const sortedPlanetsByDistanceToPlanetAsc =
  solarSystem.sortByDistanceToPlanet("Mercury");
console.log("Sorted Planets Ascending:", sortedPlanetsByDistanceToPlanetAsc);

const sortedPlanetsByDistanceToPlanetDsc = solarSystem.sortByDistanceToPlanet(
  "Mercury",
  false
);
console.log("Sorted Planets Descending:", sortedPlanetsByDistanceToPlanetDsc);

const sortedPlanetsByRadiusAsc = solarSystem.sortByRadius();
console.log("Sorted Planets by radius ascending:", sortedPlanetsByRadiusAsc);

const sortedPlanetsByRadiusDsc = solarSystem.sortByRadius(false);
console.log("Sorted Planets by radius descending:", sortedPlanetsByRadiusDsc);

const sortedPlanetsByDistanceToSunAsc = solarSystem.sortByDistanceToSun();
console.log(
  "Sorted Planets by distance to sun ascending:",
  sortedPlanetsByRadiusAsc
);

const sortedPlanetsByDistanceToSunDsc = solarSystem.sortByDistanceToSun(false);
console.log(
  "Sorted Planets by distance to sun descending:",
  sortedPlanetsByRadiusDsc
);
