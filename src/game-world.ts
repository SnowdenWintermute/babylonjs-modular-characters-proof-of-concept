import {
  AnimationGroup,
  ArcRotateCamera,
  Engine,
  Scene,
  SceneLoader,
  Vector3,
} from "babylonjs";
import { ASSET_PATHS, BASE_FILE_PATH } from "./asset-paths";
import { initScene } from "./init-scene";
import { loadCharacterModel } from "./load-character-model";
import { ModularCharacter, ModularCharacterPart } from "./modular-character";

export class GameWorld {
  scene: Scene;
  engine: Engine;
  characterAnimations: AnimationGroup[] = [];
  camera: ArcRotateCamera | null = null;
  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
    this.camera = this.initScene();

    this.init();
  }

  async init() {
    const characters = await this.spawnCharacters();

    setInterval(() => {
      characters.forEach((character) => character.randomizeParts());
    }, 1000);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  initScene = initScene;

  async spawnModularCharacter(
    this: GameWorld,
    legsPath: string,
    torsoPath: string,
    headPath: string,
    startPosition: Vector3 = new Vector3(0, 0, 0),
    startRotation: number = 0
  ): Promise<ModularCharacter> {
    const skeleton = await this.importMesh(ASSET_PATHS.SKELETONS.HUMANOID);
    skeleton.meshes[0].rotate(Vector3.Up(), Math.PI / 2 + startRotation);
    skeleton.meshes[0].position = startPosition;

    const modularCharacter = new ModularCharacter(this, skeleton);

    await modularCharacter.attachPart(ModularCharacterPart.Head, headPath);
    await modularCharacter.attachPart(ModularCharacterPart.Torso, torsoPath);
    await modularCharacter.attachPart(ModularCharacterPart.Legs, legsPath);

    await modularCharacter.equipWeapon("");

    return modularCharacter;
  }

  async spawnCharacters(): Promise<ModularCharacter[]> {
    const characterA = await this.spawnModularCharacter(
      ASSET_PATHS.LEGS.WITCH,
      ASSET_PATHS.TORSOS.WITCH,
      ASSET_PATHS.HEADS.WITCH
    );

    const characterB = await this.spawnModularCharacter(
      ASSET_PATHS.LEGS.WITCH,
      ASSET_PATHS.TORSOS.WITCH,
      ASSET_PATHS.HEADS.WITCH,
      new Vector3(0, 0, 1),
      Math.PI / 2
    );

    characterB.skeleton.animationGroups[4].stop();
    characterB.skeleton.animationGroups[16].start(true);
    return [characterA, characterB];
  }

  async importMesh(path: string) {
    return SceneLoader.ImportMeshAsync("", BASE_FILE_PATH, path, this.scene);
  }
}
