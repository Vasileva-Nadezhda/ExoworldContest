import { BaseScene } from '../scenes/BaseScene'

export class Platform extends Phaser.Physics.Arcade.Sprite {

    private static ballBounceRate = 5;
    private static lagging = 10;

    private isEnlarged = false;

    constructor(scene: BaseScene, x: number, y: number) {
        super(scene, x, y, 'platform', 0);
        scene.physics.add.existing(this, true);
        this.setScale(BaseScene.ratio, BaseScene.ratio);
        this.refreshBody();
        scene.add.existing(this);
        this.anims.create({
            key: 'normal_to_enlarged',
            frames: scene.anims.generateFrameNumbers('platform', { start: 0, end: 4 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'enlarged_to_normal',
            frames: scene.anims.generateFrameNumbers('platform', { start: 4, end: 0 }),
            frameRate: 10,
        });
        this.onInputListener(scene);
    }

    public collide(_platform: Phaser.Physics.Arcade.Body |
                              Phaser.Tilemaps.Tile |
                              Phaser.Types.Physics.Arcade.GameObjectWithBody,
                   ball:      Phaser.Physics.Arcade.Body |
                              Phaser.Tilemaps.Tile |
                              Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        const ballBody = (ball as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody).body;
        ballBody.setVelocity((Math.random() - 0.5) * Platform.ballBounceRate, ballBody.velocity.y);
    }

    public playAnimation() {
        (this.isEnlarged) ? this.anims.play('enlarged_to_normal') : this.anims.play('normal_to_enlarged');
        this.isEnlarged = !this.isEnlarged;
    }

    public onInputListener(scene: BaseScene) {
        scene.input.on('pointermove', this.processInput, this);
    }

    public offInputListener(scene: BaseScene) {
        scene.input.off('pointermove', this.processInput, this)
    }

    private processInput(pointer: Phaser.Input.Pointer, _currentlyOver: Array<Phaser.GameObjects.GameObject>) {
        if (pointer.isDown) {
            let platformShift = (this.isEnlarged) ? 21 : 14;
            if ((this.x + (pointer.x - pointer.downX) / Platform.lagging) * 2 > 114 * BaseScene.ratio) {
                this.x = (pointer.x >= BaseScene.areaCenterX) ?
                    Math.min(this.x + (pointer.x - pointer.downX) / Platform.lagging,
                        BaseScene.areaCenterX + (114 - platformShift) * BaseScene.ratio) :
                    Math.max(this.x + (pointer.x - pointer.downX) / Platform.lagging,
                        BaseScene.areaCenterX - (114 - platformShift) * BaseScene.ratio);
                pointer.downX = this.x;
            }
            this.refreshBody();
        }
    }

    public getIsEnlarged() {
        return this.isEnlarged;
    }

}