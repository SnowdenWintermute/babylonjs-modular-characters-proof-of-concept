import {
  ArcRotateCamera,
  Color3,
  Color4,
  HemisphericLight,
  MeshBuilder,
  PointLight,
  StandardMaterial,
  Vector3,
} from "babylonjs";
import { GameWorld } from "./game-world";

export function initScene(this: GameWorld): ArcRotateCamera {
  this.scene.clearColor = new Color4(0.1, 0.1, 0.15, 1);
  // CAMERA
  const camera = new ArcRotateCamera(
    "camera",
    0,
    1.5,
    2,
    new Vector3(0, 1, 0),
    this.scene
  );
  camera.wheelDeltaPercentage = 0.02;
  camera.radius = 4;
  camera.attachControl();

  // LIGHTS
  const hemiLight = new HemisphericLight(
    "hemi-light",
    new Vector3(0, 1, 0),
    this.scene
  );
  hemiLight.intensity = 0.85;
  const lightPosition = new Vector3(4.0, 8.0, 4.0);
  const pointLight = new PointLight("point-light", lightPosition, this.scene);
  const ball = MeshBuilder.CreateSphere(
    "light-source-marker",
    { diameter: 0.25 },
    this.scene
  );
  ball.position = lightPosition;
  pointLight.intensity = 0.2;

  // GROUND
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 50, height: 50 },
    this.scene
  );
  const material = new StandardMaterial("ground-material", this.scene);
  material.diffuseColor = new Color3(0.203, 0.295, 0.208);
  ground.material = material;

  return camera;
}
