/**
 * Preload the game and display the loading screen.
 */
export default class Preload extends Phaser.State {
  /**
   * Preload the required assets for the game to run.
   */
  preload() {
    this.game.load.atlasXML('spritesheet', 'src/assets/art/sheet.png', 'src/assets/art/sheet.xml');
    this.game.load.image('bg', 'src/assets/art/bg.png');
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
