import { BaseScene } from "../scenes/BaseScene";
import { weightedRandomBoolean } from "../WeightedRandom";
import { Ability } from "./Ability";

export class Block extends Phaser.Physics.Arcade.Sprite {

    private static abilityWeights = { 'green': 0.8, 'yellow': 0.6, 'pink': 0.4, 'blue': 0.2 };
    private static collisionCounters = { green: 2, yellow: 2, pink: 1, blue: 1 };
    private static scores = { green: 20, yellow: 20, pink: 10, blue: 10 };

    private blockType: string;
    private maxCollisionCount!: number;
    private collisionCount!: number;
    private ability: Ability | null;

    constructor(scene: BaseScene, x: number, y: number, type: string) {
        super(scene, x, y, `block_${type}`);
        this.setScale(BaseScene.ratio, BaseScene.ratio);
        this.blockType = type;
        this.ability = null;
        scene.physics.add.existing(this, true);
        scene.add.existing(this);
        this.refreshBody();
        this.init(scene);
    }

    public init(scene: BaseScene) {
        let attr = this.blockType as keyof typeof Block.abilityWeights;
        this.maxCollisionCount = Block.collisionCounters[attr];
        this.collisionCount = Block.collisionCounters[attr];
        if (weightedRandomBoolean([true, false], [Block.abilityWeights[attr], 1 - Block.abilityWeights[attr]]))
            this.ability = new Ability(scene, this.x, this.y);
    }

    public collide(): number {
        if (this.blockType === 'gray') return 0;
        --this.collisionCount;
        if (this.collisionCount) {
            let transparency = this.collisionCount / this.maxCollisionCount;
            this.setAlpha(transparency, transparency, transparency, transparency);
            this.refreshBody();
        }
        else {
            this.ability?.setVisible(true);
            this.ability?.setVelocityY(100 * BaseScene.ratio);
            this.destroy();
            let attr = this.blockType as keyof typeof Block.scores;
            return Block.scores[attr];
        }
        return 0;
    }

    public getAbility() {
        return this.ability;
    }

}