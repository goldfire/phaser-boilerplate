import {Howl, Howler} from 'howler';
import Stats from 'stats.js';
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

    // Handle debug mode.
    if (process.env.NODE_ENV === 'development') {
      this.setupStats();
    }
  }

  /**
   * Display the FPS and MS using Stats.js.
   */
  setupStats() {
    // Setup the new stats panel.
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    // Monkey-patch the update loop so we can track the timing.
    const updateLoop = this.update;
    this.update = (...args) => {
      stats.begin();
      updateLoop.apply(this, args);
      stats.end();
    };
  }
}

new Game();

