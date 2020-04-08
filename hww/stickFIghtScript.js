
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
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

function RndRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// REMEMBER TO CHANGE ALL POSSIBLE CONSTANTS TO const

var player1;
var player2;
var body1;
var body2;
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
var handheld1;
var handheld2;
var shots;
var pointer;

//                         ADD P2 ammo


var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'Assets/sky.png');
    this.load.image('ground', 'Assets/platform.png');
    this.load.image('star', 'Assets/star.png');
    this.load.image('bomb', 'Assets/bomb.png');
    this.load.image('pistol1', 'Assets/Guns/png/pistol2.png');
    this.load.image('ammoBox', 'Assets/Guns/png/ammobox.png');
    this.load.image('bullet', 'Assets/Guns/png/small_bullet.png');
    this.load.spritesheet('dude', 'Assets/StickManSprite.png', { frameWidth: 32, frameHeight: 64 } );
    //this.load.image()
}

function create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky');
    this.add.image(1200, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(1200, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(615, 400, 'ground');
    platforms.create(100, 250, 'ground');
    platforms.create(1100, 250, 'ground');
    platforms.create(609, 240, 'ground').setScale(0.75, 1).refreshBody();

    // The player and its settings
    player1 = this.add.container(300, 450);
    player1.setSize(20*1.3, 49*1.3);
    player2 = this.add.container(100, 450);
    player2.setSize(20*1.3, 49*1.3);
    body1 = this.add.sprite(0, 0, 'dude');
    body1.setScale(1.3);
    body2 = this.add.sprite(0, 0, 'dude');
    body2.setScale(1.3);
    handheld1 = this.add.image(20, 0);
    handheld2 = this.add.image(20, 0);

    shots = this.physics.add.group({
        allowGravity: false
    });

    //enable physics for the player container
    this.physics.world.enable(player1);
    this.physics.world.enable(player2);
    //add to the container all of the parts
    player1.add(body1);
    player1.add(handheld1);
    player2.add(body2);
    player2.add(handheld2);
    //  Player physics properties. Give the little guy a slight bounce.
    player1.body.setBounce(0.2);
    player1.body.setCollideWorldBounds(true);
    player2.body.setBounce(0.2);
    player2.body.setCollideWorldBounds(true);

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
    // mouse Input
    this.input.mouse.disableContextMenu();

    
    // Keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.KEYF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    // arrowUp key for player 1 (JUMP)
    this.input.keyboard.on('keydown_UP', function (event) {
        if (player1.body.touching.down) {
            player1.body.setVelocityY(-340);
        }
    });
    // arrowRight key for player 1 (RIGHT)
    this.input.keyboard.on('keydown_RIGHT', function (event) {
        player1.body.setVelocityX(300);
        body1.anims.play('right', true);
    });
    // arrowLeft key for player 1 (LEFT)
    this.input.keyboard.on('keydown_LEFT', function (event) {
        player1.body.setVelocityX(-300);
        body1.anims.play('left', true);
    });
    // F key for shooting
    this.input.keyboard.on('keydown_F', function (event) {
        if (playerOneAmmo > 0) {
            if (handheld1.texture.key == 'pistol1') {
                playerOneAmmo -= 1;
                p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
                shots.create(player1.x + 27, player1.y - 7, 'bullet')
                    .setScale(0.25)
                    .setVelocityX(850)
                    .setAngle(90);
            }
        }
    });

    this.input.on('pointerdown', function (pointer) {
        if (pointer.leftButtonDown()) {
            if (playerTwoAmmo > 0) {
                if (handheld2.texture.key == 'pistol1') {
                    if (!handheld2.flipX) {
                        handheld2.flipX = true;
                        handheld2.x *= -1;
                    }
                    playerTwoAmmo -= 1;
                    p2AmmoText.setText('P2 ammo: ' + playerTwoAmmo);
                    shots.create(player2.x - 40, player2.y - 7, 'bullet')
                        .setScale(0.25)
                        .setVelocityX(-850)
                        .setAngle(90);
                }
            }
        }
        else if (pointer.rightButtonDown()) {
            if (playerTwoAmmo > 0) {
                if (handheld2.texture.key == 'pistol1') {
                    if (handheld2.flipX) {
                        handheld2.flipX = false;
                        handheld2.x *= -1;
                    }
                    playerTwoAmmo -= 1;
                    p2AmmoText.setText('P2 ammo: ' + playerTwoAmmo);
                    shots.create(player2.x + 27, player2.y - 7, 'bullet')
                        .setScale(0.25)
                        .setVelocityX(850)
                        .setAngle(90);
                }
            }
        }
    }, this);




    //        ADD STOP ANIMATION



    
    // W key for player 2 (JUMP)
    this.input.keyboard.on('keydown_W', function (event) {
        if (player2.body.touching.down) {
            player2.body.setVelocityY(-340);
        }
    });
    // D key for player 2 (RIGHT)
    this.input.keyboard.on('keydown_D', function (event) {
        player2.body.setVelocityX(160);
        body2.anims.play('right', true);
    });
    // A ket for player 2 (LEFT)
    this.input.keyboard.on('keydown_A', function (event) {
        player2.body.setVelocityX(-160);
        body2.anims.play('left', true);
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
        child.setScale(0.18);
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));

    });

    pistol1s.children.iterate(function (child) {
        //scale each gun
        child.setScale(0.25);
    });

    bombs = this.physics.add.group();

    //  The score
    p1AmmoText = this.add.text(16, 16, 'P1 ammo: 0', { fontSize: '32px', fill: '#000' });
    p2AmmoText = this.add.text(1060, 16, 'P2 ammo: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player1, player2);
    this.physics.add.collider(ammo, platforms);
    this.physics.add.collider(pistol1s, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player1, ammo, overlap, null, this);
    this.physics.add.overlap(player2, ammo, overlap, null, this);
    this.physics.add.overlap(player1, pistol1s, overlap, null, this);
    this.physics.add.overlap(player2, pistol1s, overlap, null, this);
    this.physics.add.overlap(player1, shots, overlap, null, this);
    this.physics.add.overlap(player2, shots, overlap, null, this);

}

function update() {
    if (gameOver) {
        return;
    }
    pointer = this.input.activePointer;

    if (this.keyUP.isUp && this.keyRIGHT.isUp && this.keyLEFT.isUp) {
        player1.body.setVelocityX(0);

        body1.anims.play('turn');
    }

    if (this.keyW.isUp && this.keyD.isUp && this.keyA.isUp) {
        player2.body.setVelocityX(0);
        body2.anims.play('turn');
    }
}

function overlap(player, obj) {
    obj.disableBody(true, true);
    //  Add and update the score
    if (player == player1) {
        if (obj.texture.key == 'ammoBox') {
            playerOneAmmo += 5;
            p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
        } else if (obj.texture.key == 'pistol1') {
            handheld1.setTexture('pistol1');
            handheld1.setScale(0.25)
        } else if (obj.texture.key == 'bullet') {
            this.physics.pause();

            body1.setTint(0xff0000);

            body1.anims.play('turn');

            gameOver = true;
        }
    } else {
        if (obj.texture.key == 'ammoBox') {
            playerTwoAmmo += 5;
            p2AmmoText.setText('P2 ammo: ' + playerTwoAmmo);
        } else if (obj.texture.key == 'pistol1') {
            handheld2.setTexture('pistol1');
            handheld2.setScale(0.25)
        } else if (obj.texture.key == 'bullet') {
            this.physics.pause();

            body2.setTint(0xff0000);

            body2.anims.play('turn');

            gameOver = true;
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
