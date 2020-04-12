
// REMEMBER TO CHANGE ALL POSSIBLE CONSTANTS TO const

// HP:100
// pistol: 0.5sec delay, damage: 100/7 (7 shots to kill)
// assualt rifle: 0.1sec delay, damage: 100/5 (5 shots to kill)
// sniper rifle: 1sec delay, damage: 90 (2 shots to kill but kills with any other gun)

// Create the player class

class Player {
    constructor(id, startX, scene) {
        this.ID = id;
        this.Container = scene.add.container(startX, 450);
        this.Container.setSize(20 * 1.3, 49 * 1.3);
        this.Body = scene.add.sprite(0, 0, 'dude');
        this.Body.setSize(1.3);
        this.Handheld = scene.add.image(20, 0)
        this.Container.add(this.Body);
        this.Container.add(this.Handheld);
        this.hp = 100;
        this.ammo = 0;
        this.autoFire = false;
        this.autoFireRight = true;
    }
}

// Define the scene for the actual game

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
var p1AmmoText;
var p2AmmoText;
var handheld1;
var handheld2;
var shots;
var weapons
var pointer;
var autoFire1;
var autoFire2;
var autoFireDir1;
var autoFireDir2;

class MyScene extends Phaser.Scene {
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
        // TODO: add sound files and sound playing for each of the actions in the game.
        //this.load.image()
    }
    create() {
        player1 = new Player(1, 300, this);
        player2 = new Player(2, 300, this);

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
        /*player1 = this.add.container(300, 450);
        player1.setSize(20 * 1.3, 49 * 1.3);
        player2 = this.add.container(100, 450);
        player2.setSize(20 * 1.3, 49 * 1.3);
        body1 = this.add.sprite(0, 0, 'dude');
        body1.setScale(1.3);
        body2 = this.add.sprite(0, 0, 'dude');
        body2.setScale(1.3);
        handheld1 = this.add.image(20, 0);
        handheld2 = this.add.image(20, 0); */

        shots = this.physics.add.group({
            allowGravity: false
        });

        weapons = this.physics.add.group({

        });

        //enable physics for the player body
        this.physics.world.enable(player1.Body);
        this.physics.world.enable(player2.Body);
        this.physics.world.enable(player1.Container);
        this.physics.world.enable(player2.Container);
        this.physics.world.enable(shots);
        this.physics.world.enable(weapons);
        this.physics.world.enable(player1.Handheld);
        this.physics.world.enable(player2.Handheld);
        //add to the container all of the parts
        /*player1.add(body1);
        player1.add(handheld1);
        player2.add(body2);
        player2.add(handheld2); */

        //  Player physics properties. Give the little guy a slight bounce.
        player1.Body.body.setBounce(0.2);
        player1.Body.body.setCollideWorldBounds(true);
        player2.Body.body.setBounce(0.2);
        player2.Body.body.setCollideWorldBounds(true);

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
            if (player1.Body.body.touching.down) {
                player1.Body.body.setVelocityY(-340);
            }
        });
        // arrowRight key for player 1 (RIGHT)
        this.input.keyboard.on('keydown_RIGHT', function (event) {
            player1.Body.body.setVelocityX(300);
            if (player1.Handheld.flipX) {
                player1.Handheld.flipX = false;
                player1.Handheld.x *= -1;
            }
            player1.Body.anims.play('right', true);
        });
        // arrowLeft key for player 1 (LEFT)
        this.input.keyboard.on('keydown_LEFT', function (event) {
            player1.Body.body.setVelocityX(-300);
            if (!player1.Handheld.flipX) {
                player1.Handheld.flipX = true;
                player1.Handheld.x *= -1;
            }
            player1.Body.anims.play('left', true);
        });
        // F key for shooting
        this.input.keyboard.on('keydown_G', function (event) {
            if (player1.ammo > 0) {
                switch (player1.Handheld.texture.key) {
                    case 'pistol1':
                        if (!player1.Handheld.flipX) {
                            player1.Handheld.flipX = true;
                            player1.Handheld.x *= -1;
                        }
                        player1.ammo -= 1;
                        p1AmmoText.setText('P1 ammo: ' + player1.ammo);
                        shots.create(player1.Container.x - 40, player1.Container.y - 7, 'bullet1')
                            .setScale(0.25)
                            .setVelocityX(-850)
                            .setAngle(-90);
                        break;
                    case 'assaultRifle1':
                        if (!player1.Handheld.flipX) {
                            player1.Handheld.flipX = true;
                            player1.Handheld.x *= -1;
                        }
                        player1.ammo -= 1;
                        p1AmmoText.setText('P1 ammo: ' + player1.ammo);
                        shots.create(player1.Container.x - 40, player1.Container.y - 7, 'bullet2')
                            .setScale(0.3)
                            .setVelocityX(-850)
                            .setAngle(-90);
                        break;
                    case 'sniperRifle1':
                        if (!player1.Handheld.flipX) {
                            player1.Handheld.flipX = true;
                            player1.Handheld.x *= -1;
                        }
                        player1.ammo -= 1;
                        p1AmmoText.setText('P1 ammo: ' + player1.ammo);
                        shots.create(player1.Container.x - 40, player1.Container.y - 7, 'bullet3')
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
            if (player1.ammo > 0) {
                switch (player1.Handheld.texture.key) {
                    case 'pistol1':
                        if (player1.Handheld.flipX) {
                            player1.Handheld.flipX = false;
                            player1.Handheld.x *= -1;
                        }
                        player1.ammo -= 1;
                        p1AmmoText.setText('P1 ammo: ' + player1.ammo);
                        shots.create(player1.Container.x + 40, player1.ammo.y - 7, 'bullet1')
                            .setScale(0.25)
                            .setVelocityX(850)
                            .setAngle(-90);
                        break;
                    case 'assaultRifle1':
                        if (player1.Handheld.flipX) {
                            player1.Handheld.flipX = false;
                            player1.Handheld.x *= -1;
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
                        if (player1.Handheld.flipX) {
                            player1.Handheld.flipX = false;
                            player1.Handheld.x *= -1;
                        }
                        player1.ammo -= 1;
                        p1AmmoText.setText('P1 ammo: ' + player1.ammo);
                        shots.create(player1.Container.x + 40, player1.Container.y - 7, 'bullet3')
                            .setScale(0.4)
                            .setVelocityX(850)
                            .setAngle(-90);
                        break;
                    default:
                        break;
                }
            }
        });

        // TODO: A looping interval function to check if the player is trying to Auto shoot with an assault rifle

        //setInterval(function () {
          //if 
        //}, 100);

        this.input.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                if (player2.ammo > 0) {
                    if (player2.Handheld.texture.key == 'pistol1') {
                        if (!player2.Handheld.flipX) {
                            player2.Handheld.flipX = true;
                            player2.Handheld.x *= -1;
                        }
                        player2.ammo -= 1;
                        p2AmmoText.setText('P2 ammo: ' + player2.ammo);
                        shots.create(player2.Container.x - 40, player2.Container.y - 7, 'bullet1')
                            .setScale(0.25)
                            .setVelocityX(-850)
                            .setAngle(90);
                    }
                }
            }
            else if (pointer.rightButtonDown()) {
                if (player2.ammo > 0) {
                    if (player2.Handheld.texture.key == 'pistol1') {
                        if (player2.Handheld.flipX) {
                            player2.Handheld.flipX = false;
                            player2.Handheld.x *= -1;
                        }
                        player2.ammo -= 1;
                        p2AmmoText.setText('P2 ammo: ' + player2.ammo);
                        shots.create(player2.Container.x + 27, player2.Container.y - 7, 'bullet1')
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
            if (player2.Body.body.touching.down) {
                player2.Body.body.setVelocityY(-340);
            }
        });
        // D key for player 2 (RIGHT)
        this.input.keyboard.on('keydown_D', function (event) {
            player2.Body.body.setVelocityX(160);
            if (player2.Handheld.flipX) {
                player2.Handheld.flipX = false;
                player2.Handheld.x *= -1;
            }
            player2.Body.anims.play('right', true);
        });
        // A ket for player 2 (LEFT)
        this.input.keyboard.on('keydown_A', function (event) {
            player2.Body.body.setVelocityX(-160);
            if (!player2.Handheld.flipX) {
                player2.Handheld.flipX = true;
                player2.Handheld.x *= -1;
            }
            player2.Body.anims.play('left', true);
        });

        //  Spawn some ammo packs at the start for the players
        ammo = this.physics.add.group({
            key: 'ammoBox',
            repeat: 5,
            setXY: { x: 12, y: 0, stepX: 140 }
        });

        // Interval function to generate randomly at a random position a random weapon

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

        // Change the size of the starting ammo packs to look good relative to the other objects

        ammo.children.iterate(function (child) {

            //  Give each ammo pack a slightly different bounce
            child.setScale(0.18);
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));

        });

        //  The ammo remaining for both the players
        p1AmmoText = this.add.text(16, 16, 'P1 ammo: 0', { fontSize: '32px', fill: '#000' });
        p2AmmoText = this.add.text(1060, 16, 'P2 ammo: 0', { fontSize: '32px', fill: '#000' });

        //  Collide the player and the other player and with the platforms (and deflect each other when hit)

        this.physics.add.collider(player1.Body, this.platforms);
        this.physics.add.collider(player2.Body, this.platforms);
        this.physics.add.collider(player1.Body, player2.Body);
        this.physics.add.collider(ammo, this.platforms);
        this.physics.add.collider(bombs, this.platforms);
        this.physics.add.collider(weapons, this.platforms);

        //  Checks to see if the player overlaps with any of the weapons, ammo packs or the bullets if he does call the overlap function, and give the overlap function the hitted targets as parameters.
        this.physics.add.overlap(player1.Body, this.ammo, this.overlap, null, this);
        this.physics.add.overlap(player2.Body, this.ammo, this.overlap, null, this);
        this.physics.add.overlap(player1.Body, this.weapons, this.overlap, null, this);
        this.physics.add.overlap(player2.Body, this.weapons, this.overlap, null, this);
        this.physics.add.overlap(player1.Body, this.shots, this.overlap, null, this);
        this.physics.add.overlap(player2.Body, this.shots, this.overlap, null, this);
    }
    update() {
        // The main loop for the game
        // A loop that runs and checks for certain things while the game is running

        // check if the game is over, if yes
        // TODO: Change the scene to be the menu

        if (gameOver) {
            return;
        }

        // Get the pointer (the mouse) quickly as possible and update it to the game variables
        pointer = this.input.activePointer;

        // Check if one (or both) of the players are not pressing any movement keys,
        // and if yes set their velocity to 0 and play the turn animation(idle animation)

        if (this.keyUP.isUp && this.keyRIGHT.isUp && this.keyLEFT.isUp) {
            player1.Body.body.setVelocityX(0);

            player1.Body.anims.play('turn');
        }

        if (this.keyW.isUp && this.keyD.isUp && this.keyA.isUp) {
            player2.Body.body.setVelocityX(0);
            player2.Body.anims.play('turn');
        }
    }
}

// Set the config for the Phaser game
// type => which engine to use, WEBGL or Canvas, will use WEBGL if possible, if not reroute to canvas
// width & height => sets the width and height of the screen
// scene => which scene to display at the start
// physics => select if and which physics engine I would like to use (in this case Arcade physics), and some selections as the gravity
// audio => settings for the audio rendering of the game
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: MyScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    audio: {
        disableWebAudio: true
    }
};

// Create the actual game object of Phaser

var game = new Phaser.Game(config);

// Simple function to generate pseudo-random numbers from a certain range using the Math library

function RndRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function overlap(player, obj) {
    // a function to run whenever a player collides with an object what suppose to have an interaction
    // for example weapons, ammo packs, bullets and more
    // first it disables (removes) the object from the game engine (Phaser) renderer
    // the function recevies the two collided object and checks what to do depending on the objects
    // If a bullet and a player lower their HitPoints (PlayerI.hp)
    // If a player trys to pick up weapons and etc


    obj.disableBody(true, true);
    // Check for each of the texture keys to know what to do
    if (player == player1.Body) {
        if (obj.texture.key == 'ammoBox') {
            player1.ammo += 5;
            p1AmmoText.setText('P1 ammo: ' + player1.ammo);
        } else if (obj.texture.key == 'pistol1') {
            player1.ammo += 5;
            p1AmmoText.setText('P1 ammo: ' + player1.ammo);
            player1.Handheld.setTexture('pistol1');
            player1.Handheld.setScale(0.25)
        } else if (obj.texture.key == 'bullet1') {
            player1.hp -= 100 / 7;
            if (player1.hp < 0) {
                this.physics.pause();
                player1.Body.setTint(0xff0000);
                player2.Body.setTint(0xff0000);
                // TODO: make sure the player can't re-play the animation of the running/walking
                player1.Body.anims.play('turn');
                player2.Body.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                // UNDONE: add image when game is over
                gameOver = true;
            }
        } else if (obj.texture.key == 'assaultRifle1') {
            player1.ammo += 7;
            p1AmmoText.setText('P1 ammo: ' + player1.ammo);
            player1.Handheld.setTexture('assaultRifle1');
            player1.Handheld.setScale(0.17);
        } else if (obj.texture.key == 'sniperRifle1') {
            player1.ammo += 3;
            p1AmmoText.setText('P1 ammo: ' + player1.ammo);
            player1.Handheld.setTexture('sniperRifle1');
            player1.Handheld.setScale(0.17);
        }
    } else {
        if (obj.texture.key == 'ammoBox') {
            player2.ammo += 5;
            p2AmmoText.setText('P2 ammo: ' + player2.ammo);
        } else if (obj.texture.key == 'pistol1') {
            player2.ammo += 5;
            p2AmmoText.setText('P2 ammo: ' + player2.ammo);
            player2.Handheld.setTexture('pistol1');
            player2.Handheld.setScale(0.25)
        } else if (obj.texture.key == 'bullet1') {
            player2.hp -= 100 / 7;
            if (player2.hp < 0) {
                this.physics.pause();
                player1.Body.setTint(0xff0000);
                player2.Body.setTint(0xff0000);
                player1.Body.anims.play('turn');
                Player2.Body.anims.play('turn');

                var victorySFX = this.sound.add('victory');
                victorySFX.play();
                // UNDONE: add image when game is over
                gameOver = true;
            }
        } else if (obj.texture.key == 'assaultRifle1') {
            player2.ammo += 7;
            p2AmmoText.setText('P2 ammo: ' + player2.ammo);
            player2.Handheld.setTexture('assaultRifle1');
            player2.Handheld.setScale(0.17);
        } else if (obj.texture.key == 'sniperRifle1') {
            player2.ammo += 3;
            p2AmmoText.setText('P2 ammo: ' + player2.ammo);
            player2.Handheld.setTexture('sniperRifle1');
            player2.Handheld.setScale(0.17);
        }
    }


    // check if there isn't any ammo packs on the map and if yes respawna all the ammo packs
    // TODO: change this to trigger a change in a variable that will hold the options for the random spawner until a new ammo pack is spawned randomly
    if (ammo.countActive(true) === 0) {
        //  A new batch of stars to collect
        ammo.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
    }
}
// UNDONE: make a variable hold the speed for multiple objs  (players, bullets, etc)
