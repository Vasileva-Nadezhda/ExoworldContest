import { BaseScene } from "../scenes/BaseScene";
import { Block } from "./Block";

export class Level {

    private grid: Array<Array<string>>;
    private blocks: Phaser.Physics.Arcade.StaticGroup;
    private abilities: Phaser.Physics.Arcade.Group;

    constructor(scene: BaseScene) {
        this.blocks = scene.physics.add.staticGroup();
        this.abilities = scene.physics.add.group();
        this.grid = scene.cache.json.get('level_templates')[('template_' + (Math.floor(Math.random() * 3) + 1))];
        let block;
        let x;
        let y = 200 * BaseScene.ratio;
        for (let j = 0; j < 7; ++j) {
            x = BaseScene.areaCenterX - BaseScene.areaWidth / 2 + 30 * BaseScene.ratio + 1;
            for (let i = 0; i < 11; ++i) {
                block = new Block(scene, x, y, this.grid[j][i]);
                this.blocks.add(block);
                if (block.getAbility())
                    this.abilities.add(block.getAbility()!);
                x += 21 * BaseScene.ratio;
            }
            y += 11 * BaseScene.ratio;
        }
    }

    public getBlocks() {
        return this.blocks;
    }

    public getAbilities() {
        return this.abilities;
    }

}