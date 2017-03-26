/**
 * Preload the game and display the loading screen.
 */
export default class Preload extends Phaser.State {
  /**
   * Preload the required assets for the game to run.
   */
  preload() {

  }

  /**
   * Once loading is complete, switch to the main state.
   */
  create() {
    this.game.state.start('Main');
  }

  /**
   * Update the loading display with the progress.
   */
  update() {

  }
}
