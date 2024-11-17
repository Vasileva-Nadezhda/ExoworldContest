import { Ability } from '../objects/Ability.ts';
import { Block } from '../objects/Block.ts';
import { Interface } from '../objects/Interface.ts';
import { Level } from '../objects/Level.ts';
import { Platform } from '../objects/Platform.ts';
import { BaseScene } from './BaseScene.ts'

export class Game extends BaseScene {

    private scoreMultiplier = 2;
    private maxBallsCount = 3;
    private level!: Level;
    private balls!: Phaser.GameObjects.Group;
    private platform!: Platform;
    private interface!: Interface;
    private secondsLeft = 60;
    private secondsEnlarged = 0;
    private secondsScoreMultiplier = 0;
    

    constructor() {
        super('Game');
    }

    preload() {
        super.preload();
    }

    create() {
        this.interface = new Interface(this);
        this.balls = this.physics.add.group();
        this.increaseBallsCount(false);
        this.level = new Level(this);
        this.platform = new Platform(this, BaseScene.areaCenterX, 400 * BaseScene.ratio);
        this.physics.add.collider(this.platform, this.balls, this.platform.collide, null!, this.platform);
        this.physics.add.collider(this.interface.getWalls(), this.balls, (wall, ball) => {
            if ((wall as Phaser.GameObjects.Rectangle).y > BaseScene.areaCenterY)
                ball.destroy();
        }, null!, this);
        this.physics.add.collider(this.interface.getWalls(), this.level.getAbilities(), (wall, ability) => {
            if ((wall as Phaser.GameObjects.Rectangle).y > BaseScene.areaCenterY)
                ability.destroy();
        }, null!, this);
        this.physics.add.collider(this.balls, this.level.getBlocks(), (ball, block) => {
            let deltaScore = (block as Block).collide();
            this.updateScore(deltaScore * ((this.secondsScoreMultiplier) ? this.scoreMultiplier : 1));
            const ballSprite = ball as Phaser.Physics.Arcade.Sprite;
            ballSprite.setVelocity((Math.random() - 0.5) * 100, ballSprite.body?.velocity.y);
        }, null!, this);
        this.physics.add.collider(this.platform, this.level.getAbilities(), this.processAbilitiyCollision, null!, this);
        
        this.time.addEvent({
            delay: 1000, callback: this.updateTime, callbackScope: this, loop: true
        });
        console.log(this.level.getAbilities().getChildren());
    }

    update() {
        if (!this.balls.getLength() || !this.secondsLeft) {
            this.physics.pause();
            this.platform.offInputListener(this);
            this.time.removeAllEvents();
            let text = this.add.text(0, 0,
                'Game Over!',
                { fontFamily: 'customFont', fontSize: `40px`, color: '#999' });
            text.x = BaseScene.areaCenterX - text.width / 2;
            text.y = BaseScene.areaHeight - 100 * BaseScene.ratio;
        }
    }

    private increaseBallsCount(ability: boolean) {
        console.log('ssafas');
        let ball;
        let toAdd = ((!ability) ? 1 : this.maxBallsCount - this.balls.getLength());
        for (let i = 0; i < toAdd; ++i) {
            ball = this.physics.add.sprite(((ability) ? this.platform.x : BaseScene.areaCenterX), ((ability) ? this.platform.y - 10: BaseScene.areaCenterY), 'ball');
            this.balls.add(ball);
            ball.setVelocity(((ability) ? (Math.random() - 0.5) * 100 : 0), ((ability) ? -200 * BaseScene.ratio : 200 * BaseScene.ratio));
            ball.setBounce(1);
            ball.setScale(BaseScene.ratio, BaseScene.ratio);
            ball.refreshBody();
        }
    }


    private processAbilitiyCollision(_platform: Phaser.Physics.Arcade.Body |
                                                Phaser.Tilemaps.Tile |
                                                Phaser.Types.Physics.Arcade.GameObjectWithBody,
                                     abilityBody: Phaser.Physics.Arcade.Body |
                                                  Phaser.Tilemaps.Tile |
            Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        const ability = abilityBody as Ability;
        switch (ability.getAbilityType()) {
            case 'platformEnlarger':
                if (!this.platform.getIsEnlarged())
                    this.platform.playAnimation();
                this.secondsEnlarged += 15;
            break;
            case 'scoreMultiplier':
                this.secondsScoreMultiplier += 10;
            break;
            case 'ballsCountIncreaser':
                this.increaseBallsCount(true);
            break;
        }
        abilityBody.destroy();
    }

    private updateTime() {
        this.secondsLeft--;
        if (this.secondsEnlarged === 1) {
            this.platform.playAnimation();
            this.secondsEnlarged--;
        }
        else if (this.secondsEnlarged > 0)
            this.secondsEnlarged--;
        if (this.secondsScoreMultiplier > 0) {
            this.secondsEnlarged--;
        }     
        this.interface.updateTime(this.secondsLeft);
    }

    private updateScore(delta: number) {
        Game.score += delta;
        this.interface.updateScore(Game.score);
    }

    public getPlatform() {
        return this.platform;
    }

}