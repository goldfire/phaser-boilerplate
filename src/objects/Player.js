import screenWrap from '../utils';

/**
 * Setup and control base player.
 */
export default class Player {
  constructor(cfg) {
    this.sprite = cfg.game.add.sprite(cfg.x, cfg.y, 'spritesheet', cfg.tex);
    this.sprite.anchor.set(0.5);
    this.controls = cfg.game.input.keyboard.createCursorKeys();
    cfg.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.update = () => {
      if (this.controls.up.isDown) {
        cfg.game.physics.arcade.accelerationFromRotation(this.sprite.rotation + (90 * (Math.PI / 180)), 200, this.sprite.body.acceleration);
      } else {
        this.sprite.body.acceleration.set(0);
      }

      if (this.controls.left.isDown) {
        this.sprite.body.angularVelocity = -300;
      } else if (this.controls.right.isDown) {
        this.sprite.body.angularVelocity = 300;
      } else {
        this.sprite.body.angularVelocity = 0;
      }

      screenWrap(this.sprite, cfg.game);
    };
  }
}
