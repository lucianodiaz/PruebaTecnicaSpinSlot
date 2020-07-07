import Bootloader from './bootloader.js';
import Scn_play from './scenes/scn_play.js';

const config =
{
    width: 490,
    height: 650,
    parent: "container",
    type: Phaser.AUTO,

    backgroundColor: '#ffffff',
    scene: 
    [
        Bootloader,
        Scn_play
       
    ]
}

var game = new Phaser.Game(config);
