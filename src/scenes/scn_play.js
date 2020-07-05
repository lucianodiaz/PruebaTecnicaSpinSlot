class Scn_play extends Phaser.Scene
{
    constructor()
    {
        super({key: "Scn_play"});
    }

    create()
    {

        this.logo = this.add.image(this.sys.game.config.width/2,5,"logo");
        this.backframe = this.add.image(0,80,"backFrame");

        this.logo.setOrigin(0.5,0);
        this.backframe.setOrigin(0,0);

        this.btnSpin = this.add.sprite(this.sys.game.config.width/2 + 150,this.sys.game.config.height - 50,"button");
        this.btnSpin.setInteractive();
        
        this.btnSpin.on("pointerdown",function()
        {
            console.log("SPIN!");
        });
        this.btnSpin.on("pointerup",function()
        {
            console.log("up!");
          
        });
    }

    
}

export default Scn_play;

