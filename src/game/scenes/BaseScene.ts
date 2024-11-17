export class BaseScene extends Phaser.Scene {

    static baseWidth = 270;
    static baseHeight = 600;
    static areaWidth = window.innerHeight * this.baseWidth / this.baseHeight;
    static areaHeight = window.innerHeight;
    static areaCenterX = window.innerWidth / 2;
    static areaCenterY = window.innerHeight / 2;
    static ratio = this.areaWidth / this.baseWidth;
    protected static score = 0;

    constructor(config: string) {
        super(config);
    }

    preload() {
        const newFont = new FontFace('customFont', 'url(../assets/fonts/mobile-font.regular.ttf)');
        newFont.load();
        document.fonts.add(newFont);
        this.load.json('level_templates', './assets/level_templates.json');
        this.load.image('background', './assets/sprites/background.png');
        this.load.image('ball', './assets/sprites/ball.png');
        this.load.spritesheet('platform', './assets/sprites/platform_spritesheet.png', { frameWidth: 42, frameHeight: 8 });
        this.load.image('block_blue', './assets/sprites/block_blue.png');
        this.load.image('block_pink', './assets/sprites/block_pink.png');
        this.load.image('block_green', './assets/sprites/block_green.png');
        this.load.image('block_yellow', './assets/sprites/block_yellow.png');
        this.load.image('block_gray', './assets/sprites/block_gray.png');
        this.load.image('scoreMultiplier', './assets/sprites/scoreMultiplier.png');
        this.load.image('platformEnlarger', './assets/sprites/platformEnlarger.png');
        this.load.image('ballsCountIncreaser', './assets/sprites/ballsCountIncreaser.png');
    }

    create() {

    }

    update() {

    }
}