/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
  constructor(config) {
    super(config.game, config.x, config.y, config.key, config.frame);
  }
}
