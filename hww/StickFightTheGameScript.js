function RndRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// REMEMBER TO CHANGE ALL POSSIBLE CONSTANTS TO const

// HP:100
// pistol: 0.5sec delay, damage: 100/7 (7 shots to kill)
// assualt rifle: 0.1sec delay, damage: 100/5 (5 shots to kill)
// sniper rifle: 1sec delay, damage: 90 (2 shots to kill but kills with any other gun)

var players = [];

class Player {
    constructor(id, startX, scene) {
        this.ID = id;
        this.Container = scene.add.container(startX, 450);
        this.scale = 1.5;
        this.Container.setSize(20 * 0.9 * this.scale, 49 * 0.9 * this.scale);
        this.Body = scene.add.sprite(0, 0, 'dude');
        this.Body.setScale(this.scale);
        this.Body.setSize(this.scale * 0.9, this.scale);
        this.Handheld = scene.add.image(20, 0)
        this.Container.add(this.Body);
        this.Container.add(this.Handheld);
        this.hp = 100;
        this.ammo = 0;
        this.autoFire = false;
        this.autoFireRight = true;
        this.AmmoText = null;
        players.push(this);
    }
} 


var player1;
var player2;
var ammo;
var bombs;
var weapons;
var platforms;
var cursors;
var keyW;
var keyA;
var keyD;
var keyUP;
var keyRIGHT;
var keyLEFT;
var gameOver = false;
var shots;
var pointer;
var music;

class menuScene extends Phaser.Scene {
    constructor()
    {
        super({ key: 'menuScene' });
    }
    preload() {
        this.load.image('background', 'Assets/background1.jpg');
        this.load.image('startSelected', 'Assets/startSelected.png');
        this.load.image('startNotSelected', 'Assets/startNotSelected.png');
        this.load.image('aboutNotSelected', 'Assets/aboutNotSelected (1).png');
        this.load.image('aboutSelected', 'Assets/aboutSelected (1).png');
        this.load.image('arrowKeys', 'Assets/arrowKey.png');
        this.load.image('wasdKeys', 'Assets/wasdKey.png');
        this.load.image('mouseKey', 'Assets/mouse.png');
        this.load.image('GHKey', 'Assets/GHKey.png');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    create() {
        this.background = this.add.image(640, 300, 'background').setScale(2,1.5);
        this.startButton = this.add.image(640, 100, 'startSelected').setScale(1.55);
        this.aboutButton = this.add.image(640, 500, 'aboutNotSelected');
        this.arrowKey = this.add.image(240, 30, 'wasdKeys').setScale(0.5);
        this.wasdKey = this.add.image(1025, 35, 'arrowKeys');
        this.mouseKey = this.add.image(220, 95, 'mouseKey').setScale(0.07);
        this.GHKey = this.add.image(1025, 95, 'GHKey').setScale(0.5);
        var add = this.add;
        WebFont.load({
            google: {
                families: ['Freckle Face', 'Finger Paint', '"Press Start 2P"']
            },
            active: function () {
                add.text(16, 35, 'player 2 movement:', { fontFamily: '"Press Start 2P"', fontSize: 10, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                add.text(16, 100, 'player 2 shooting:', { fontFamily: '"Press Start 2P"', fontSize: 10, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                add.text(800, 35, 'player 1 movement:', { fontFamily: '"Press Start 2P"', fontSize: 10, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                add.text(800, 100, 'player 1 shooting:', { fontFamily: '"Press Start 2P"', fontSize: 10, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
                add.text(450, 300, 'use arrows the switch between buttons\nand press enter to choose\nin game when you hold an\nassault rifle hold for auto shoot', { fontFamily: '"Press Start 2P"', fontSize: 10, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
            }
        });
        this.input.manager.enabled = true;
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        if (this.startButton.texture.key == 'startSelected' && this.keyDown.isDown && !this.keyUp.isDown) {
            this.startButton.setTexture('startNotSelected');
            this.aboutButton.setTexture('aboutSelected');
            console.log('aboutSelected');
        } else if (this.startButton.texture.key == 'startNotSelected' && this.keyUp.isDown && !this.keyDown.isDown) {
            this.startButton.setTexture('startSelected');
            this.aboutButton.setTexture('aboutNotSelected');
            console.log('startSelected');
        }
        if (this.startButton.texture.key == 'startSelected' && this.keyEnter.isDown) {
            this.scene.start('gameScene');
        } else if (this.aboutButton.texture.key == 'aboutSelected' && this.keyEnter.isDown) {
            window.location.href = "Home.aspx";
        }
    }
}

class gameScene extends Phaser.Scene {
    constructor()
    {
        super({ key: 'gameScene' });
    }
    preload() {
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
        this.load.audio('music1', 'Assets/music/Stuck_in_the_Middle.ogg');
        // TODO: add sound files and sound playing for each of the actions in the game.
    }
    create() {
        var musicConfig = {
            mute: false,
            volume: 0.01,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        music = this.sound.add('music1', musicConfig);
        music.play();

        //  A simple background for the game
        this.add.image(400, 300, 'sky');
        this.add.image(1200, 300, 'sky');

        //  The platforms group contains the ground and the ledges we can jump on
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

        // Now creating the players
        player1 = new Player(1, 450, this);
        player2 = new Player(2, 300, this);

        // creating a physics group for all the bullets and weapons
        shots = this.physics.add.group({
            allowGravity: false
        });

        weapons = this.physics.add.group({

        });

        //enable physics for the player container
        for (var i = 0; i < players.length; i++) {
            this.physics.world.enable(players[i].Container);
            players[i].Container.add(players[i].Body);
            players[i].Container.add(players[i].Handheld);
            players[i].Container.body.setBounce(0.2);
            players[i].Container.body.setCollideWorldBounds(true);
        }

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
        this.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        // arrowUp key for player 1 (JUMP)
        this.input.keyboard.on('keydown_UP', function (event) {
            movePlayer(player1, "up");
        });
        // arrowRight key for player 1 (RIGHT)
        this.input.keyboard.on('keydown_RIGHT', function (event) {
            movePlayer(player1, "right");
        });
         //arrowLeft key for player 1 (LEFT)
        this.input.keyboard.on('keydown_LEFT', function (event) {
            movePlayer(player1, "left");
        });
        // G key for shooting left
        this.input.keyboard.on('keydown_G', function (event) {
            playerShoot(player1, 'left');
        });

        this.input.keyboard.on('keydown_H', function (event) {
            playerShoot(player1, 'right');
        });


        // UNDONE: Make autofire for the assault rifle - SOLVED

        // Check if one of the mouse buttons is down, and then which one is pressed down
        this.input.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                playerShoot(player2, 'left');
            }
            else if (pointer.rightButtonDown()) {
                playerShoot(player2, 'right');
            }
        }, this);



        // W key for player 2 (JUMP)
        this.input.keyboard.on('keydown_W', function (event) {
            movePlayer(player2, "up");
        });
        // D key for player 2 (RIGHT)
        this.input.keyboard.on('keydown_D', function (event) {
            movePlayer(player2, "right");
        });
        // A ket for player 2 (LEFT)
        this.input.keyboard.on('keydown_A', function (event) {
            movePlayer(player2, "left");
        });

        //  set a physics group of ammo packs to collect, 6 in total, evenly spaced 140 pixels apart along the x axis
        ammo = this.physics.add.group({
            key: 'ammoBox',
            repeat: 5,
            setXY: { x: 12, y: 0, stepX: 140 }
        });

        // set an Interval function for the weapon random spawning

        setInterval(weaponSpawn, 1000);

        // Iterate at every ammo pack now screen (should be all of them since it's after spawning them) and change there scale and bounce a little bit
        ammo.children.iterate(function (child) {

            //  Give each ammo pack a slightly different bounce
            child.setScale(0.18);
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));

        });



        // UNUSED: 
        bombs = this.physics.add.group();




        //  The score counters
        player1.AmmoText = this.add.text(16, 16, 'P1 ammo: 0', { fontSize: '32px', fill: '#000' });
        player2.AmmoText = this.add.text(1060, 16, 'P2 ammo: 0', { fontSize: '32px', fill: '#000' });

        //  Collide the player, ammo packs, bullets and weapons with the platforms
        this.physics.add.collider(player1.Container, player2.Container);
        this.physics.add.collider(ammo, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(weapons, platforms);
        this.physics.add.collider(shots, platforms);
        // The colliders and overlaps that can be shortened using a for loop
        for (var i = 0; i < players.length; i++) {
            this.physics.add.collider(players[i].Container, platforms);
            //  Checks to see if one of the players overlaps with any of the items, if they does call the overlap function
            this.physics.add.overlap(players[i].Container, ammo, overlap, null, this);
            this.physics.add.overlap(players[i].Container, weapons, overlap, null, this);
            this.physics.add.overlap(players[i].Container, shots, overlap, null, this);
        }
        //  Checks to see if one of the players overlaps with any of the items, if they does call the overlap function
        pointer = this.input.activePointer;
        bypassThisForAutoMode(this.keyG, this.keyH, pointer);
    }
    update() {
        // check if the game is over
        if (gameOver) {
            this.scene.start('gameOverScene');
        }
        // update the pointer details
        pointer = this.input.activePointer;

        // check to see if one of the players is idling, if yes stop his walking and it's animation
        if (this.keyUP.isUp && this.keyRIGHT.isUp && this.keyLEFT.isUp) {
            player1.Container.body.setVelocityX(0);

            player1.Body.anims.play('turn');
        }

        if (this.keyW.isUp && this.keyD.isUp && this.keyA.isUp) {
            player2.Container.body.setVelocityX(0);
            player2.Body.anims.play('turn');
        }
    }
}

class gameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOverScene' });
    }
    preload() {
        this.load.image('gameOverBackground', 'Assets/gameOverBackground.jpg');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    create() {
        this.input.manager.enabled = true;
        var add = this.add;
        WebFont.load({
            google: {
                families: ['Freckle Face', 'Finger Paint', '"Press Start 2P"']
            },
            active: function () {
                add.text(20, 35, 'game over! press left click to start over', { fontFamily: '"Press Start 2P"', fontSize: 30, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
            }
        });
        this.input.once('pointerdown', function () {

            this.scene.start('menuScene');

        }, this);
    }
}
// use image in the downloads folder for gameOverScreen.png for the end scene background


// TODO: Scenes (menu end screen...)

// Set the config for the Phaser game
// type => which engine to use, WEBGL or Canvas, will use WEBGL if possible, if not reroute to canvas
// width & height => sets the width and height of the screen. The weird resolution is a part of an accident but it looks beautiful like that it has been left this way
// scene => which scene to display at the start
// physics => select if and which physics engine I would like to use (in this case Arcade physics), and some selections as the gravity
// audio => settings for the audio rendering of the game
// debug => helps a lot with debugging show hitbox and more
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 600,
    scene: [menuScene, gameScene, gameOverScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    }
};

// Create the actual game object of Phaser

var game = new Phaser.Game(config);

function playerShoot(player, direction) {
    var bulletVelocity = 850;
    var bulletRotation = -90;
    // check if the player have enough ammo
    if (player.ammo > 0) {

        // check for the weapon to know what distance from the Container, which bullet to shoot and how much to scale the bullet
        var bulletOffset = [0, 0];
        var scaleOffset = 1;
        var bulletTexture = 'bullet1';

        // TODO: change bulletOffset for each of the weapons - SOLVED
        switch (player.Handheld.texture.key) {
            case 'pistol1':
                bulletOffset[0] = 25;
                bulletOffset[1] = 7;
                scaleOffset = 0.25;
                bulletTexture = 'bullet1';
                break;
            case 'assaultRifle1':
                bulletOffset[0] = 50;
                bulletOffset[1] = 0;
                scaleOffset = 0.3;
                bulletTexture = 'bullet2'
                break;
            case 'sniperRifle1':
                bulletOffset[0] = 58;
                bulletOffset[1] = 3;
                scaleOffset = 0.4;
                bulletTexture = 'bullet3'
                break;
            default:
                console.log("Error occured in playerShoot function, unknown weapon recevied in switch!");
                break;
        }
        // check if flipping hand is needed according to the direction
        if (direction == 'left') {
            if (!player.Handheld.flipX) {
                player.Handheld.flipX = true;
                player.Handheld.x *= -1;
            }
            bulletVelocity *= -1;
        } else {
            if (player.Handheld.flipX) {
                player.Handheld.flipX = false
                player.Handheld.x *= -1;
            }
            bulletOffset[0] *= -1;
            bulletRotation *= -1;
        }
        if (player.Handheld.texture.key != 'assaultRifle1') {
            // decrement the ammo and update the ammo counter for the player
            player.ammo--;
            player.AmmoText.setText('P' + player.ID + ' ammo: ' + player.ammo);
            // create the bullet according to all of the properties
            shots.create(player.Container.x - bulletOffset[0], player.Container.y - bulletOffset[1], bulletTexture)
                .setScale(scaleOffset)
                .setVelocityX(bulletVelocity)
                .setAngle(bulletRotation)
        }
    }
}

function movePlayer(player, direction) {
    switch (direction) {
        case "right":
            player.Container.body.setVelocityX(300);
            if (player.Handheld.flipX) {
                player.Handheld.flipX = false;
                player.Handheld.x *= -1;
            }
            player.Body.anims.play('right', true);
            break;
        case "left":
            player.Container.body.setVelocityX(-300);
            if (!player.Handheld.flipX) {
                player.Handheld.flipX = true;
                player.Handheld.x *= -1;
            }
            player.Body.anims.play('left', true);
            break;
        case "up":
            if (player.Container.body.touching.down) {
                player.Container.body.setVelocityY(-340);
            }
            break;
        default:
            console.log("Error occured got an unknown move direction)");
            break;
    }
}

function weaponSpawn() {
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
}

function overlap(player, obj) {
    obj.disableBody(true, true);
    //  Add and update the score
    // TODO: Make overlap function support OOP - Isn't possible because of how Phaser.overlap works, must work like that.:(
    if (player == player1.Container) {
        if (obj.texture.key == 'ammoBox') {
            player1.ammo += 5;
            player1.AmmoText.setText('P1 ammo: ' + player1.ammo);
        } else if (obj.texture.key == 'pistol1') {
            player1.ammo += 5;
            player1.AmmoText.setText('P1 ammo: ' + player1.ammo);
            player1.Handheld.setTexture('pistol1');
            player1.Handheld.setScale(0.25)
        } else if (obj.texture.key == 'bullet1') {
            player1.hp -= 100 / 7;
            if (player1.hp < 0) {
                this.physics.pause();
                player2.Body.setTint(0xff0000);
                player1.Body.setTint(0xff0000);
                player2.Body.anims.play('turn');
                player1.Body.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                gameOver = true;
            }
        } else if (obj.texture.key == 'bullet2') {
            player1.hp -= 20;
            if (player1.hp < 0) {
                this.physics.pause();
                player2.Body.setTint(0xff0000);
                player1.Body.setTint(0xff0000);
                player2.Body.anims.play('turn');
                player1.Body.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                gameOver = true;
            }
        } else if (obj.texture.key == 'bullet3') {
            player1.hp -= 99;
            if (player1.hp < 0) {
                this.physics.pause();
                player2.Body.setTint(0xff0000);
                player1.Body.setTint(0xff0000);
                player2.Body.anims.play('turn');
                player1.Body.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                gameOver = true;
            }
        } else if (obj.texture.key == 'assaultRifle1') {
            player1.ammo += 7;
            player1.AmmoText.setText('P1 ammo: ' + player1.ammo);
            player1.Handheld.setTexture('assaultRifle1');
            player1.Handheld.setScale(0.17);
        } else if (obj.texture.key == 'sniperRifle1') {
            player1.ammo += 3;
            player1.AmmoText.setText('P1 ammo: ' + player1.ammo);
            player1.Handheld.setTexture('sniperRifle1');
            player1.Handheld.setScale(0.17);
        }
    } else {
        if (obj.texture.key == 'ammoBox') {
            player2.ammo += 5;
            player2.AmmoText.setText('P2 ammo: ' + player2.ammo);
        } else if (obj.texture.key == 'pistol1') {
            player2.ammo += 5;
            player2.AmmoText.setText('P2 ammo: ' + player2.ammo);
            player2.Handheld.setTexture('pistol1');
            player2.Handheld.setScale(0.25)
        } else if (obj.texture.key == 'bullet1') {
            player2.hp -= 100 / 7;
            if (player2.hp < 0) {
                this.physics.pause();
                player2.Body.setTint(0xff0000);
                player1.Body.setTint(0xff0000);
                player2.Body.anims.play('turn');
                player1.Body.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                gameOver = true;
            }
        } else if (obj.texture.key == 'bullet2') {
            player2.hp -= 20;
            if (player2.hp < 0) {
                this.physics.pause();
                player2.Body.setTint(0xff0000);
                player1.Body.setTint(0xff0000);
                player2.Body.anims.play('turn');
                player1.Body.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                gameOver = true;
            }
        } else if (obj.texture.key == 'bullet3') {
                player2.hp -= 99;
            if (player2.hp < 0) {
                this.physics.pause();
                player2.Body.setTint(0xff0000);
                player1.Body.setTint(0xff0000);
                player2.Body.anims.play('turn');
                player1.Body.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                gameOver = true;
            }
        } else if (obj.texture.key == 'assaultRifle1') {
            player2.ammo += 7;
            player2.AmmoText.setText('P2 ammo: ' + player2.ammo);
            player2.Handheld.setTexture('assaultRifle1');
            player2.Handheld.setScale(0.17);
        } else if (obj.texture.key == 'sniperRifle1') {
            player2.ammo += 3;
            player2.AmmoText.setText('P2 ammo: ' + player2.ammo);
            player2.Handheld.setTexture('sniperRifle1');
            player2.Handheld.setScale(0.17);
        }
    }

    if (ammo.countActive(true) === 0) {
        //  A new batch of ammo packs to collect
        ammo.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

    }
}

function autoMode(keyG, keyH, pointerClick) {
    // cannot support OOP becuase of key bind differents
    if (player1.Handheld.texture.key == 'assaultRifle1' && player1.ammo > 0 && (keyG.isDown || keyH.isDown)) {
        var bulletVelocity = 850;
        var bulletRotation = -90;
        var bulletOffset = [45, 4];
        var scaleOffset = 0.3;
        var bulletTexture = 'bullet2';
        if (keyG.isDown && keyH.isUp) {
            if (!player1.Handheld.flipX) {
                player1.Handheld.flipX = true;
                player1.Handheld.x *= -1;
            }
            bulletVelocity *= -1;
        } else if (keyH.isDown && keyG.isUp) {
            if (player1.Handheld.flipX) {
                player1.Handheld.flipX = false
                player1.Handheld.x *= -1;
            }
            bulletOffset[0] *= -1;
            bulletRotation *= -1;
        }
        // decrement the ammo and update the ammo counter for the player
        player1.ammo--;
        player1.AmmoText.setText('P' + player1.ID + ' ammo: ' + player1.ammo);
        // create the bullet according to all of the properties
        shots.create(player1.Container.x - bulletOffset[0], player1.Container.y - bulletOffset[1], bulletTexture)
            .setScale(scaleOffset)
            .setVelocityX(bulletVelocity)
            .setAngle(bulletRotation);
    }
    if (player2.Handheld.texture.key == 'assaultRifle1' && player2.ammo > 0 && (pointer.leftButtonDown() || pointer.rightButtonDown())) {
        var bulletVelocity = 850;
        var bulletRotation = -90;
        var bulletOffset = [40, 7];
        var scaleOffset = 0.3;
        var bulletTexture = 'bullet2';
        if (!pointerClick.rightButtonDown() && pointerClick.leftButtonDown()) {
            if (!player2.Handheld.flipX) {
                player2.Handheld.flipX = true;
                player2.Handheld.x *= -1;
            }
            bulletVelocity *= -1;
        } else if (pointerClick.rightButtonDown() && !pointerClick.leftButtonDown()) {
            if (player2.Handheld.flipX) {
                player2.Handheld.flipX = false
                player2.Handheld.x *= -1;
            }
            bulletOffset[0] *= -1;
            bulletRotation *= -1;
        }
        // decrement the ammo and update the ammo counter for the player
        player2.ammo--;
        player2.AmmoText.setText('P' + player2.ID + ' ammo: ' + player2.ammo);
        // create the bullet according to all of the properties
        shots.create(player2.Container.x - bulletOffset[0], player2.Container.y - bulletOffset[1], bulletTexture)
            .setScale(scaleOffset)
            .setVelocityX(bulletVelocity)
            .setAngle(bulletRotation);
    }
}

function bypassThisForAutoMode(keyG, keyH, pointer) {
    // A little bit of a cheat to trick the system into passing the protected variables from the class of the scene to the interval function
    setInterval(function() { autoMode(keyG, keyH, pointer) }, 100);
}

function cheat(player, cheatCode) {
    switch (cheatCode) {
        case 'ammo':
            player.ammo += 10000;
            player.AmmoText.setText('P' + player.ID + ' ammo: ' + player.ammo);
            break;
        case 'assaultRifle1':
            player.Handheld.setTexture('assaultRifle1');
            player.Handheld.setScale(0.17);
            break;
        case 'pistol1':
            player.Handheld.setTexture('pistol1');
            player.Handheld.setScale(0.25)
            break;
        case 'sniperRifle1':
            player.Handheld.setTexture('sniperRifle1');
            player.Handheld.setScale(0.17);
            break;
        case 'grenade':
            console.log("Grenade cheat has been called");
            break;
        default:
            console.log("cheat not found!");

    }
}
// UNDONE: make a variable hold the speed for multiple objs  (players, bullets, etc)