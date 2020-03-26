
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


class player {
    constructor() {
    }
}


// REMEMBER TO CHANGE ALL POSSIBLE CONSTANTS TO const

var player1;
var player2;
var ammo;
var bombs;
var platforms;
var cursors;
var keyW;
var keyA;
var keyD;
var keyUP;
var keyRIGHT;
var keyLEFT;
var playerOneAmmo = 0;
var playerTwoAmmo = 0;
var gameOver = false;
var p1Ammo;

//                         ADD P2 ammo


var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'Assets/sky.png');
    this.load.image('ground', 'Assets/platform.png');
    this.load.image('star', 'Assets/star.png');
    this.load.image('bomb', 'Assets/bomb.png');
    this.load.image('pistol1', 'Assets/Guns/png/pistol2.png');
    this.load.image('ammoBox', 'Assets/Guns/png/ammobox.png');
    this.load.spritesheet('dude', 'Assets/StickManSprite.png', { frameWidth: 32, frameHeight: 64 } );
    //this.load.image()
}

function create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player1 = this.physics.add.sprite(300, 450, 'dude');
    player2 = this.physics.add.sprite(100, 450, 'dude');
    //  Player physics properties. Give the little guy a slight bounce.
    player1.setBounce(0.2);
    player1.setCollideWorldBounds(true);
    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 10, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 0 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 20, end: 25 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    // arrowUp key for player 1 (JUMP)
    this.input.keyboard.on('keydown_UP', function (event) {
        if (player1.body.touching.down) {
            player1.setVelocityY(-340);
        }
    });
    // arrowRight key for player 1 (RIGHT)
    this.input.keyboard.on('keydown_RIGHT', function (event) {
        player1.setVelocityX(160);
        player1.anims.play('right', true);
    });
    // arrowLeft key for player 1 (LEFT)
    this.input.keyboard.on('keydown_LEFT', function (event) {
        player1.setVelocityX(-160);
        player1.anims.play('left', true);
    });




    //        ADD STOP ANIMATION




    
    // W key for player 2 (JUMP)
    this.input.keyboard.on('keydown_W', function (event) {
        if (player2.body.touching.down) {
            player2.setVelocityY(-340);
        }
    });
    // D key for player 2 (RIGHT)
    this.input.keyboard.on('keydown_D', function (event) {
        player2.setVelocityX(160);
        player2.anims.play('right', true);
    });
    // A ket for player 2 (LEFT)
    this.input.keyboard.on('keydown_A', function (event) {
        player2.setVelocityX(-160);
        player2.anims.play('left', true);
    });

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    ammo = this.physics.add.group({
        key: 'ammoBox',
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 140 }
    });

    pistol1s = this.physics.add.group({
        key: 'pistol1',
        repeat: 5,
        setXY: { x: 82, y: 0, stepX: 140 }
    });


    ammo.children.iterate(function (child) {

        //  Give each ammo pack a slightly different bounce
        child.setScale(0.3);
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));

    });

    pistol1s.children.iterate(function (child) {
        //scale each gun
        child.setScale(0.3);
    });

    bombs = this.physics.add.group();

    //  The score
    p1AmmoText = this.add.text(16, 16, 'P1 ammo: 0', { fontSize: '32px', fill: '#000' });
    p2AmmoText = this.add.text(584, 16, 'P2 ammo: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player1, player2);
    this.physics.add.collider(ammo, platforms);
    this.physics.add.collider(pistol1s, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player1, ammo, collect, null, this);
    this.physics.add.overlap(player2, ammo, collect, null, this);
    this.physics.add.overlap(player1, pistol1s, collect, null, this);
    this.physics.add.overlap(player2, pistol1s, collect, null, this);

    this.physics.add.collider(player1, bombs, hitBomb, null, this);
    this.physics.add.collider(player2, bombs, hitBomb, null, this);
}

function update() {
    if (gameOver) {
        return;
    }

    if (this.keyUP.isUp && this.keyRIGHT.isUp && this.keyLEFT.isUp) {
        player1.setVelocityX(0);

        player1.anims.play('turn');
    }

    if (this.keyW.isUp && this.keyD.isUp && this.keyA.isUp) {
        player2.setVelocityX(0);
        player2.anims.play('turn');
    }
}

function collect(player, obj) {
    obj.disableBody(true, true);
    //  Add and update the score
    if (player == player1) {
        if (obj.texture.key = 'ammoBox') {
            playerOneAmmo += 5;
            p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
        } else if (obj.texture.key == 'pistol1') {
            var handheld = this.add.image(player.x, player.y, 'pistol1');
            handheld.setScale(0.2);
        }
    } else {
        if (obj.texture.key == 'ammoBox') {
            playerTwoAmmo += 5;
            p2AmmoText.setText('P2 ammo: ' + playerTwoAmmo);
        } else if (obj.texture.key == 'pistol1') {
            ;
        }
    }

    if (ammo.countActive(true) === 0) {
        //  A new batch of stars to collect
        ammo.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
