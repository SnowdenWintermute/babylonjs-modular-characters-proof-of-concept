import "babylonjs-loaders";
import { GameWorld } from "./game-world";

const canvas = document.getElementById("babylon-canvas");

const world = new GameWorld(canvas as HTMLCanvasElement);
window.addEventListener("resize", () => {
  world.engine.resize();
});
