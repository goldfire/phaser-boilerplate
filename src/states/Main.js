import throttle from 'lodash.throttle';
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

    // Add background tile.
    this.game.add.tileSprite(-5000, -5000, 10000, 10000, 'bg');

    // Add a player to the game.
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      key: 'textures',
      frame: 'ship',
    });

    // ...

    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    this.scale.setGameSize(width, height);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    
  }
}
