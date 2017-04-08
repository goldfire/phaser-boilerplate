import WebpackLoader from 'phaser-webpack-loader';
import AssetManifest from '../AssetManifest';

/**
 * Preload the game and display the loading screen.
 */
export default class Preload extends Phaser.State {
  /**
   * Once loading is complete, switch to the main state.
   */
  create() {
    this.game.plugins.add(WebpackLoader, AssetManifest)
      .load()
      .then(() => {
        this.game.state.start('Main');
      });
  }

  /**
   * Update the loading display with the progress.
   */
  update() {

  }
}
