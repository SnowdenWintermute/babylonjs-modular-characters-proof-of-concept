import {
  AnimationGroup,
  ArcRotateCamera,
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  MeshBuilder,
  PointLight,
  Scene,
  StandardMaterial,
  Vector3,
} from "babylonjs";

console.log("tseting");
const canvas = document.getElementById("babylon-canvas");
console.log("canvas: ", canvas);

export class GameWorld {
  scene: Scene;
  engine: Engine;
  characterAnimations: AnimationGroup[] = [];
  camera: ArcRotateCamera | null = null;
  mouse: Vector3 = new Vector3(0, 1, 0);
  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.init();
  }

  async init() {
    this.camera = await this.initScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  async initScene(): Promise<ArcRotateCamera> {
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
      "ball",
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

    // CHARACTERS
    // const characterA = await this.loadCharacterModel(
    //   ASSET_PATHS.LEGS.WITCH,
    //   ASSET_PATHS.TORSOS.WITCH,
    //   ASSET_PATHS.HEADS.WITCH
    // );

    // const characterB = await this.loadCharacterModel(
    //   ASSET_PATHS.LEGS.WITCH,
    //   ASSET_PATHS.TORSOS.WITCH,
    //   ASSET_PATHS.HEADS.WITCH,
    //   new Vector3(0, 0, 1),
    //   Math.PI / 2
    // );

    // characterB.skeleton.animationGroups[4].stop();
    // characterB.skeleton.animationGroups[16].start(true);

    // setInterval(() => {
    //   this.randomizeParts(characterA);
    //   this.randomizeParts(characterB);
    // }, 1000);

    return camera;
  }

  // async importMesh(path: string) {
  //   return SceneLoader.ImportMeshAsync("", BASE_FILE_PATH, path, this.scene);
  // }

  // async loadCharacterModel(
  //   legsPath: string,
  //   torsoPath: string,
  //   headPath: string,
  //   startPosition: Vector3 = new Vector3(0, 0, 0),
  //   startRotation: number = 0
  // ): Promise<ModularCharacter> {
  //   const skeleton = await this.importMesh(ASSET_PATHS.SKELETONS.HUMANOID);
  //   skeleton.meshes[0].rotate(Vector3.Up(), Math.PI / 2 + startRotation);
  //   skeleton.meshes[0].position = startPosition;

  //   const modularCharacter = new ModularCharacter(this, skeleton);

  //   await modularCharacter.attachPart(ModularCharacterPart.Head, headPath);
  //   await modularCharacter.attachPart(ModularCharacterPart.Torso, torsoPath);
  //   await modularCharacter.attachPart(ModularCharacterPart.Legs, legsPath);

  //   await modularCharacter.equipWeapon("");

  //   return modularCharacter;
  // }

  // async randomizeParts(modularCharacter: ModularCharacter) {
  //   const newHeadPath =
  //     Math.random() > 0.5
  //       ? ASSET_PATHS.HEADS.MIDIEVAL
  //       : ASSET_PATHS.HEADS.WITCH;
  //   const newTorsoPath =
  //     Math.random() > 0.5
  //       ? ASSET_PATHS.TORSOS.MIDIEVAL
  //       : ASSET_PATHS.TORSOS.WITCH;
  //   const newLegsPath =
  //     Math.random() > 0.5 ? ASSET_PATHS.LEGS.MIDIEVAL : ASSET_PATHS.LEGS.WITCH;

  //   modularCharacter.attachPart(ModularCharacterPart.Head, newHeadPath);
  //   modularCharacter.attachPart(ModularCharacterPart.Torso, newTorsoPath);
  //   modularCharacter.attachPart(ModularCharacterPart.Legs, newLegsPath);
  // }
}

console.log("canvas: ", canvas);
const world = new GameWorld(canvas as HTMLCanvasElement);
