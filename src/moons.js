const moons = [
  { name: "evens", angle: 0, radius: 1, orbits: 0 },
  { name: "odds", angle: 180, radius: 1, orbits: 0 },
  { name: "dawn", angle: 0, radius: 2, orbits: 0 },
  { name: "dusk", angle: 180, radius: 2, orbits: 0 },
  { name: "week", angle: 0, radius: 3, orbits: 0 },
  { name: "evenMonths", angle: 0, radius: 4, orbits: 0 },
  { name: "oddMonths", angle: 180, radius: 4, orbits: 0 },
  { name: "yearRise", angle: 0, radius: 5, orbits: 0 },
  { name: "yearFall", angle: 180, radius: 5, orbits: 0 },
  { name: "generation", angle: 0, radius: 6, orbits: 0 },
  {
    name: "sun",
    angle: 0,
    radius: 7,
    orbits: 0,
    orbitAs: 2,
    ascending: 0,
    descending: 180,
    seasonalSpeed: 5
  }
  // { name: "solar ascending node", angle: 0, radius: 7, orbits: 0, orbitAs: 5 },
  // {
  //   name: "solar descending node",
  //   angle: 180,
  //   radius: 7,
  //   orbits: 0,
  //   orbitAs: 5
  // }
];
export default moons;
