
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
    },
    audio: {
        disableWebAudio: true
    }
};

function RndRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// REMEMBER TO CHANGE ALL POSSIBLE CONSTANTS TO const

// HP:100
// pistol: 0.5sec delay, damage: 100/7 (7 shots to kill)
// assualt rifle: 0.1sec delay, damage: 100/5 (5 shots to kill)
// sniper rifle: 1sec delay, damage: 90 (2 shots to kill but kills with any other gun)


class Player {
    constructor(id, startX) {
        this.ID = id;
        this.Container = game.add.container(startX, 450);
        this.Container.setSize(20 * 1.3, 49 * 1.3);
        this.Body = game.add.sprite(0, 0, 'dude');
        this.Body.setSize(1.3);
        this.Handheld = game.add.image(20, 0)
        this.Container.add(this.Body);
        this.Container.add(this.Handheld);
        this.hp = 100;
        this.ammo = 0;
        this.autoFire = false;
        this.autoFireRight = true;
    }
}

player1 = new Player(1, 300);
player2 = new Player(2, 300);

var player1;
var player2;
var body1;
var body2;
var hp1 = 100;
var hp2 = 100;
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
var autoFire1;
var autoFire2;
var autoFireDir1;
var autoFireDir2;

var game = new Phaser.Game(config);

function preload() {
    // Image and sprite loading
    this.load.image('sky', 'Assets/sky.png');
    this.load.image('ground', 'Assets/platform.png');
    this.load.image('star', 'Assets/star.png');
    this.load.image('bomb', 'Assets/bomb.png');
    this.load.image('pistol1', 'Assets/Guns/png/pistol2.png');
    this.load.image('assaultRifle1', 'Assets/Guns/png/assaultrifle.png');
    this.load.image('sniperRifle1', 'Assets/Guns/png/sniper2.png');
    this.load.image('grenade1', 'Assets/Guns/png/grenade.png');
    this.load.image('ammoBox', 'Assets/Guns/png/ammobox.png');
    this.load.image('bullet1', 'Assets/Guns/png/small_bullet.png');
    this.load.image('bullet2', 'Assets/Guns/png/medium_bullet2.png');
    this.load.image('bullet3', 'Assets/Guns/png/large_bullet.png');
    this.load.spritesheet('dude', 'Assets/StickManSprite.png', { frameWidth: 32, frameHeight: 64 });
    // Sound files and music loading
    this.load.audio('victory', 'Assets/SFX/Athena_-_Victory.ogg');
    // TODO: add sound files and sound playing for each of the actions in the game.
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

    weapons = this.physics.add.group({

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
    this.KEYG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    this.KEYH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    // arrowUp key for player 1 (JUMP)
    this.input.keyboard.on('keydown_UP', function (event) {
        if (player1.body.touching.down) {
            player1.body.setVelocityY(-340);
        }
    });
    // arrowRight key for player 1 (RIGHT)
    this.input.keyboard.on('keydown_RIGHT', function (event) {
        player1.body.setVelocityX(300);
        if (handheld1.flipX) {
            handheld1.flipX = false;
            handheld1.x *= -1;
        }
        body1.anims.play('right', true);
    });
    // arrowLeft key for player 1 (LEFT)
    this.input.keyboard.on('keydown_LEFT', function (event) {
        player1.body.setVelocityX(-300);
        if (!handheld1.flipX) {
            handheld1.flipX = true;
            handheld1.x *= -1;
        }
        body1.anims.play('left', true);
    });
    // F key for shooting
    this.input.keyboard.on('keydown_G', function (event) {
        if (playerOneAmmo > 0) {
            switch (handheld1.texture.key) {
                case 'pistol1':
                    if (!handheld1.flipX) {
                        handheld1.flipX = true;
                        handheld1.x *= -1;
                    }
                    playerOneAmmo -= 1;
                    p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
                    shots.create(player1.x - 40, player1.y - 7, 'bullet1')
                        .setScale(0.25)
                        .setVelocityX(-850)
                        .setAngle(-90);
                    break;
                case 'assaultRifle1':
                    if (!handheld1.flipX) {
                        handheld1.flipX = true;
                        handheld1.x *= -1;
                    }
                    playerOneAmmo -= 1;
                    p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
                    shots.create(player1.x - 40, player1.y - 7, 'bullet2')
                        .setScale(0.3)
                        .setVelocityX(-850)
                        .setAngle(-90);
                    break;
                case 'sniperRifle1':
                    if (!handheld1.flipX) {
                        handheld1.flipX = true;
                        handheld1.x *= -1;
                    }
                    playerOneAmmo -= 1;
                    p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
                    shots.create(player1.x - 40, player1.y - 7, 'bullet3')
                        .setScale(0.4)
                        .setVelocityX(-850)
                        .setAngle(-90);
                    break;
                default:
                    break;
            }
        }
    });

    this.input.keyboard.on('keydown_H', function (event) {
        if (playerOneAmmo > 0) {
            switch (handheld1.texture.key) {
                case 'pistol1':
                    if (handheld1.flipX) {
                        handheld1.flipX = false;
                        handheld1.x *= -1;
                    }
                    playerOneAmmo -= 1;
                    p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
                    shots.create(player1.x + 40, player1.y - 7, 'bullet1')
                        .setScale(0.25)
                        .setVelocityX(850)
                        .setAngle(-90);
                    break;
                case 'assaultRifle1':
                    if (handheld1.flipX) {
                        handheld1.flipX = false;
                        handheld1.x *= -1;
                    }
                    /*
                    playerOneAmmo -= 1;
                    p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
                    shots.create(player1.x + 40, player1.y - 7, 'bullet2')
                        .setScale(0.3)
                        .setVelocityX(850)
                        .setAngle(-90);*/
                    autoFire1 = true;
                    autoFireDir1 = true;
                    break;
                case 'sniperRifle1':
                    if (handheld1.flipX) {
                        handheld1.flipX = false;
                        handheld1.x *= -1;
                    }
                    playerOneAmmo -= 1;
                    p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
                    shots.create(player1.x + 40, player1.y - 7, 'bullet3')
                        .setScale(0.4)
                        .setVelocityX(850)
                        .setAngle(-90);
                    break;
                default:
                    break;
            }
        }
    });

    setInterval(function () {
        if 
    }, 100);

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
                    shots.create(player2.x - 40, player2.y - 7, 'bullet1')
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
                    shots.create(player2.x + 27, player2.y - 7, 'bullet1')
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
        if (handheld2.flipX) {
            handheld2.flipX = false;
            handheld2.x *= -1;
        }
        body2.anims.play('right', true);
    });
    // A ket for player 2 (LEFT)
    this.input.keyboard.on('keydown_A', function (event) {
        player2.body.setVelocityX(-160);
        if (!handheld2.flipX) {
            handheld2.flipX = true;
            handheld2.x *= -1;
        }
        body2.anims.play('left', true);
    });

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    ammo = this.physics.add.group({
        key: 'ammoBox',
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 140 }
    });

    setInterval(function () {
        var spawnObject = RndRange(0, 100);
        if (spawnObject < 34) {
            var chooseObject = RndRange(0, 4);
            var objectX = RndRange(0, 1281);
            switch (chooseObject) {
                case 0:
                    weapons.create(objectX, 0, 'pistol1')
                        .setScale(0.25);
                    break;
                case 1:
                    weapons.create(objectX, 0, 'assaultRifle1')
                        .setScale(0.17);
                    break;
                case 2:
                    weapons.create(objectX, 0, 'sniperRifle1')
                        .setScale(0.17);
                    break;
                case 3:
                    weapons.create(objectX, 0, 'grenade1')
                        .setScale(0.2);;
                    break;
                default:
                    break;
            }
        }
    }, 1000);

    ammo.children.iterate(function (child) {

        //  Give each ammo pack a slightly different bounce
        child.setScale(0.18);
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));

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
    //this.physics.add.collider(pistol1s, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(weapons, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player1, ammo, overlap, null, this);
    this.physics.add.overlap(player2, ammo, overlap, null, this);
    this.physics.add.overlap(player1, weapons, overlap, null, this);
    this.physics.add.overlap(player2, weapons, overlap, null, this);
    //this.physics.add.overlap(player1, pistol1s, overlap, null, this);
    //this.physics.add.overlap(player2, pistol1s, overlap, null, this);
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
            playerOneAmmo += 5;
            p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
            handheld1.setTexture('pistol1');
            handheld1.setScale(0.25)
        } else if (obj.texture.key == 'bullet1') {
            hp -= 100 / 7;
            if (hp1 < 0) {
                this.physics.pause();
                body2.setTint(0xff0000);
                body1.setTint(0xff0000);
                body2.anims.play('turn');
                body1.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                // UNDONE: add image when game is over
                gameOver = true;
            }
        } else if (obj.texture.key == 'assaultRifle1') {
            playerOneAmmo += 7;
            p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
            handheld1.setTexture('assaultRifle1');
            handheld1.setScale(0.17);
        } else if (obj.texture.key == 'sniperRifle1') {
            playerOneAmmo += 3;
            p1AmmoText.setText('P1 ammo: ' + playerOneAmmo);
            handheld1.setTexture('sniperRifle1');
            handheld1.setScale(0.17);
        }
    } else {
        if (obj.texture.key == 'ammoBox') {
            playerTwoAmmo += 5;
            p2AmmoText.setText('P2 ammo: ' + playerTwoAmmo);
        } else if (obj.texture.key == 'pistol1') {
            playerTwoAmmo += 5;
            p2AmmoText.setText('P2 ammo: ' + playerTwoAmmo);
            handheld2.setTexture('pistol1');
            handheld2.setScale(0.25)
        } else if (obj.texture.key == 'bullet1') {
            hp2 -= 100 / 7;
            if (hp2 < 0) {
                this.physics.pause();
                body2.setTint(0xff0000);
                body1.setTint(0xff0000);
                body2.anims.play('turn');
                body1.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                // UNDONE: add image when game is over
                gameOver = true;
            }
        } else if (obj.texture.key == 'assaultRifle1') {
            playerTwoAmmo += 7;
            p2AmmoText.setText('P2 ammo: ' + playerTwoAmmo);
            handheld2.setTexture('assaultRifle1');
            handheld2.setScale(0.17);
        } else if (obj.texture.key == 'sniperRifle1') {
            playerTwoAmmo += 3;
            p2AmmoText.setText('P2 ammo: ' + playerTwoAmmo);
            handheld2.setTexture('sniperRifle1');
            handheld2.setScale(0.17);
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
// UNDONE: make a variable hold the speed for multiple objs  (players, bullets, etc)
