import Phaser from 'phaser'
import { Game } from './scenes/Game'
import { BaseScene } from './scenes/BaseScene'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    min: {
        width: BaseScene.baseWidth,
        height: BaseScene.baseHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [Game]
};

const StartGame = (parent: string) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame