import { BaseScene } from "../scenes/BaseScene";
import { weightedRandomString } from "../WeightedRandom";

export class Ability extends Phaser.Physics.Arcade.Sprite {

    private static abilities = ['platformEnlarger', 'scoreMultiplier', 'ballsCountIncreaser'];
    private static abilityWeights = [ 0.5, 0.25, 0.25 ];

    private abilityType: string;

    constructor(scene: BaseScene, x: number, y: number) {
        const type = weightedRandomString(Ability.abilities, Ability.abilityWeights);
        super(scene, x, y, type);
        this.abilityType = type;
        this.setVisible(false);
        scene.physics.add.existing(this, false);
        this.setScale(BaseScene.ratio, BaseScene.ratio);
        this.refreshBody();
        scene.add.existing(this);
    }

    public getAbilityType() {
        return this.abilityType;
    }

}