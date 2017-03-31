import Player from '../objects/Player';

/**
 * Setup and display the main game state.
 */
export default class Main extends Phaser.State {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    // Enable arcade physics.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add the background.
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');

    // Add the player.
    new Player({
      x: 50,
      y: 50,
      tex: 49, // enemyBlack1
      game: this.game
    });
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    
  }
}
