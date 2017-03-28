import {Howl, Howler} from 'howler';
import Boot from './states/Boot';
import Preload from './states/Preload';
import Main from './states/Main';

/**
 * Setup the root class for the whole game.
 */
class Game extends Phaser.Game {
  constructor() {
    // Setup the game's stage.
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;
    super(width, height, Phaser.AUTO);

    // Setup the different game states.
    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('Main', Main, false);

    // Kick things off with the boot state.
    this.state.start('Boot');
  }
}

new Game();
