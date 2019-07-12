import React from "react";
import {
  Table,
  TableHeader as TableHead,
  TableBody,
  TableRow,
  TableCell,
  RangeInput,
  Heading
} from "grommet";

import moons from "./moons";
const uniqRadii = new Set(moons.map(moon => moon.radius));
const ORBIT_SPACING = 30;
// increment this to increase TableCelle speed of TableCelle simulation
const ORBIT_SPEED = 1;

// const App = () => <div>this is TableCelle App</div>;
class App extends React.Component {
  state = {
    moons,
    baseAngle: 0, // starting angle for radius 1
    canvasCtx: null,
    canvasWidth: 0,
    canvasHeight: 0,
    speed: ORBIT_SPEED,
    lastUpdate: new Date()
  };
  canvas = React.createRef();

  componentDidMount() {
    // Sets the initial canvas dimensions, gets the canvas 2D context, sets initial
    // positions & starts updating positions.
    if (this.canvas) {
      const canvasWidth = (this.canvas.current.width = window.innerWidth / 2);
      const canvasHeight = (this.canvas.current.height = Math.min(
        window.innerHeight,
        500
      ));
      const canvasCtx = this.canvas.current.getContext("2d");
      this.setState({ canvasWidth, canvasHeight, canvasCtx });
      this.orbitTick();
    }
  }

  orbitTick = () => {
    // update each moon's angle and number of orbits
    const now = new Date();
    const deltaSeconds =
      (now.valueOf() - this.state.lastUpdate.valueOf()) / 1000;
    const moons = this.state.moons.map(moon => {
      const angle =
        (moon.angle +
          deltaSeconds *
            Math.floor(10 ** this.state.speed) *
            10 ** -((moon.orbitAs || moon.radius) - 1)) %
        360;
      const orbits = angle < moon.angle ? moon.orbits + 1 : moon.orbits;
      return { ...moon, angle, orbits };
    });

    this.setState({ moons, lastUpdate: now });
    window.requestAnimationFrame(this.orbitTick);
  };

  // Draw orbital diagram based on internal state
  animate = () => {
    const { canvasCtx: ctx, canvasWidth, canvasHeight, moons } = this.state;
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const planetX = canvasWidth / 2;
      const planetY = canvasHeight / 2;
      // draw planet
      ctx.beginPath();
      ctx.arc(planetX, planetY, 10, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fill();

      // draw orbits
      uniqRadii.forEach(radii => {
        ctx.beginPath();
        ctx.arc(planetX, planetY, radii * ORBIT_SPACING, 0, Math.PI * 2, false);
        ctx.stroke();
      });

      // draw moons
      moons.forEach(moon => {
        const moonX =
          moon.radius * ORBIT_SPACING * Math.cos(moon.angle * (Math.PI / 180));
        const moonY =
          moon.radius * ORBIT_SPACING * Math.sin(moon.angle * (Math.PI / 180));
        const orbitX = moonX + planetX;
        const orbitY = moonY + planetY;
        ctx.beginPath();
        ctx.arc(orbitX, orbitY, 5, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fillStyle = "#000";
        ctx.fill();
      });
    }
  };

  componentDidUpdate() {
    this.animate();
  }

  render() {
    return (
      <div>
        <div className="planet-n-moons">
          <canvas ref={this.canvas} />
          <div className="speed">
            <Heading level={3}>Speed</Heading>
            <RangeInput
              value={this.state.speed}
              min={-1}
              max={5}
              step={1}
              onChange={e => this.setState({ speed: e.target.value })}
            />
          </div>
        </div>
        <div className="counters">
          <Table compact>
            <TableHead>
              <TableRow>
                <TableCell>Moon</TableCell>
                <TableCell>Orbits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.moons.map(moon => (
                <TableRow>
                  <TableCell>{moon.name}</TableCell>
                  <TableCell>{moon.orbits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table compact>
            <TableHead>
              <TableRow>
                <TableCell>Unit</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Hour</TableCell>
                <TableCell>
                  {this.state.moons
                    .filter(
                      moon => moon.name === "evens" || moon.name === "odds"
                    )
                    .reduce((hours, moon) => hours + moon.orbits, 0) % 20}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Days (20 Hours)</TableCell>
                <TableCell>
                  {(this.state.moons.find(moon => moon.name === "dawn").orbits %
                    10) +
                    1}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Week (10 Days)</TableCell>
                <TableCell>
                  {(this.state.moons.find(moon => moon.name === "week").orbits %
                    5) +
                    1}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Month (5 Weeks)</TableCell>
                <TableCell>
                  {(this.state.moons
                    .filter(
                      moon =>
                        moon.name === "evenMonths" || moon.name === "oddMonths"
                    )
                    .reduce(
                      (monTableCells, moon) => monTableCells + moon.orbits,
                      0
                    ) %
                    10) +
                    1}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Year (10 MonTableCells)</TableCell>
                <TableCell>
                  {this.state.moons
                    .filter(
                      moon =>
                        moon.name === "yearRise" || moon.name === "yearFall"
                    )
                    .reduce(
                      (monTableCells, moon) => monTableCells + moon.orbits,
                      0
                    )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Generations</TableCell>
                <TableCell>
                  {
                    this.state.moons.find(moon => moon.name === "generation")
                      .orbits
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
