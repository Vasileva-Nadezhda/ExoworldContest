import { BaseScene } from '../scenes/BaseScene'

export class Interface {

    private backgroundImage: Phaser.GameObjects.Image;
    private walls: Phaser.Physics.Arcade.StaticGroup;
    private scoreText: Phaser.GameObjects.Text;
    private timeText: Phaser.GameObjects.Text;

    public getWalls() {
        return this.walls;
    }

    constructor(scene: BaseScene) {
        this.backgroundImage = scene.add.image(BaseScene.areaCenterX,
            BaseScene.areaCenterY,
            'background');
        this.backgroundImage.setScale(BaseScene.ratio, BaseScene.ratio);
        this.walls = scene.physics.add.staticGroup();
        this.walls.add(scene.add.rectangle(BaseScene.areaCenterX,
            BaseScene.areaHeight - 70 * BaseScene.ratio,
            BaseScene.areaWidth,
            140 * BaseScene.ratio));
        this.walls.add(scene.add.rectangle(BaseScene.areaCenterX,
            40 * BaseScene.ratio,
            BaseScene.areaWidth,
            80 * BaseScene.ratio));
        this.walls.add(scene.add.rectangle(BaseScene.areaCenterX - BaseScene.areaWidth / 2 + 10 * BaseScene.ratio,
            BaseScene.areaCenterY,
            20 * BaseScene.ratio,
            BaseScene.areaHeight));
        this.walls.add(scene.add.rectangle(BaseScene.areaCenterX + BaseScene.areaWidth / 2 - 10 * BaseScene.ratio,
            BaseScene.areaCenterY,
            20 * BaseScene.ratio,
            BaseScene.areaHeight));

        this.scoreText = scene.add.text(0, 0,
            'Score: 0',
            { fontFamily: 'customFont', fontSize: `20px`, color: '#999' });
        this.scoreText.x = BaseScene.areaCenterX - this.scoreText.width / 2;
        this.scoreText.y = 35 * BaseScene.ratio;
        this.timeText = scene.add.text(0, 0,
            'Time: 03:00',
            { fontFamily: 'customFont', fontSize: `20px`, color: '#999' });
        this.timeText.x = BaseScene.areaCenterX - this.timeText.width / 2;
        this.timeText.y = 50 * BaseScene.ratio;
    }

    public updateScore(score: number) {
        this.scoreText.setText('Score: ' + score);
    }

    public updateTime(secondsLeft: number) {
        this.timeText.setText('Time: 0' +
            Math.floor(secondsLeft / 60) + ':' +
            (secondsLeft % 60).toString().padStart(2, '0'));
    }

}