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

    // ...

    // Setup listener for window resize.
    this.scale.setResizeCallback(this.resize, this);
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    this.scale.setGameSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    
  }
}
