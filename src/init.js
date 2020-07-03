const config =
{
    width: 490,
    height: 570,
    parent: "container",
    type: Phaser.AUTO,

    backgroundColor: '#FFFFFF',
    scene: 
    {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);



function preload()
{
    this.load.image("background","./assets/frame.png");
}

function create()
{
    this.background = this.add.image(0,0,"background");

    this.background.setOrigin(0,0);
}

function update()
{

}