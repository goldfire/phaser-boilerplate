import screenWrap from '../utils';

/**
 * Setup and control base player.
 */
export default class Player {
  constructor(cfg) {
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
    this.sprite = this.game.add.sprite(cfg.x, cfg.y, 'spritesheet', cfg.shipTex);
    this.sprite.anchor.set(0.5);
    this.controls = this.game.input.keyboard.createCursorKeys();
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.thruster = this.game.make.sprite(7, -20, 'spritesheet', cfg.thrusterTex);
    this.thruster.visible = false;
    this.thruster.rotation = Math.PI;
    this.sprite.addChild(this.thruster);

    this.sprite.update = () => {
      if (this.controls.up.isDown) {
        this.thruster.visible = true;
        this.game.physics.arcade.accelerationFromRotation(this.sprite.rotation + (90 * (Math.PI / 180)), 200, this.sprite.body.acceleration);
      } else {
        this.thruster.visible = false;
        this.sprite.body.acceleration.set(0);
      }

      if (this.controls.left.isDown) {
        this.sprite.body.angularVelocity = -300;
      } else if (this.controls.right.isDown) {
        this.sprite.body.angularVelocity = 300;
      } else {
        this.sprite.body.angularVelocity = 0;
      }

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.shoot();
      }

      screenWrap(this.sprite, this.game);
    };
  }

  shoot() {
    if (this.game.time.now > this.bulletTime) {
      let bullet = this.bullets.getFirstExists(false);

      if (bullet) {
        // TODO: alternating phasers doesn't work right since we're rotating the ship... but whatever
        const x = this.sprite.body.x + this.sprite.width * (this.leftPhaser ? 3/4 : 1/4);
        const y = this.sprite.body.y + this.sprite.height / 2;
        bullet.reset(x, y);
        bullet.lifespan = 2000;
        bullet.rotation = this.sprite.rotation;
        this.game.physics.arcade.velocityFromRotation(this.sprite.rotation + (90 * (Math.PI / 180)), 400, bullet.body.velocity);
        this.bulletTime = this.game.time.now + 75;
        this.leftPhaser = !this.leftPhaser;
      }
    }
  }
}
