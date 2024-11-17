import { useRef, useState } from 'react'
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame'

function App() {

    const [, setCanMoveSprite] = useState(true);
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const currentScene = (scene: Phaser.Scene) => {
        setCanMoveSprite(scene.scene.key === 'Game');
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    )
}

export default App
