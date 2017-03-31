import screenWrap from '../utils';

/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
  constructor(cfg) {
    super(cfg.game, cfg.x, cfg.y, 'spritesheet', cfg.shipTex);

    this.game = cfg.game;

    // make the bullets first so they depth sort beneath the ship
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(40, 'spritesheet', cfg.bulletTex);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bulletTime = 0;
    this.leftPhaser = true; // to alternate between phasers

    // then make the ship
    this.game.add.existing(this); // add it to the game
    this.anchor.set(0.5);
    this.controls = this.game.input.keyboard.createCursorKeys();
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.thruster = this.game.make.sprite(7, -20, 'spritesheet', cfg.thrusterTex);
    this.thruster.visible = false;
    this.thruster.rotation = Math.PI;
    this.addChild(this.thruster);
  }

  shoot() {
    if (this.game.time.now > this.bulletTime) {
      let bullet = this.bullets.getFirstExists(false);

      if (bullet) {
        // TODO: alternating phasers doesn't work right since we're rotating the ship... but whatever
        const x = this.body.x + this.width * (this.leftPhaser ? 3/4 : 1/4);
        const y = this.body.y + this.height / 2;
        bullet.reset(x, y);
        bullet.lifespan = 2000;
        bullet.rotation = this.rotation;
        this.game.physics.arcade.velocityFromRotation(this.rotation + (90 * (Math.PI / 180)), 400, bullet.body.velocity);
        this.bulletTime = this.game.time.now + 75;
        this.leftPhaser = !this.leftPhaser;
      }
    }
  }

  update() {
    if (this.controls.up.isDown) {
      this.thruster.visible = true;
      this.game.physics.arcade.accelerationFromRotation(this.rotation + (90 * (Math.PI / 180)), 200, this.body.acceleration);
    } else {
      this.thruster.visible = false;
      this.body.acceleration.set(0);
    }

    if (this.controls.left.isDown) {
      this.body.angularVelocity = -300;
    } else if (this.controls.right.isDown) {
      this.body.angularVelocity = 300;
    } else {
      this.body.angularVelocity = 0;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.shoot();
    }

    screenWrap(this, this.game);
  }
}
