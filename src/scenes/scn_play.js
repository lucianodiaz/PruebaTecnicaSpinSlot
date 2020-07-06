import wrapper from '../gameObject/Wrapper.js'
class Scn_play extends Phaser.Scene
{
    wrapper = new wrapper();

    constructor()
    {
        super({key: "Scn_play"});
    }

    create()
    {
        //Wrapper
        console.log(this.wrapper.getReels());
        console.log(this.wrapper.getPaylines());
        console.log(this.wrapper.getPaytable());

        

        //logo,back,boton,puntos
        this.logo = this.add.image(this.sys.game.config.width/2,5,"logo");
        this.backframe = this.add.image(0,80,"backFrame");
        this.btnSpin = this.add.sprite(this.sys.game.config.width/2 + 150,this.sys.game.config.height - 50,"button");
        this.points = this.add.image(95,this.sys.game.config.height - 50,'prizeWindow');
        this.textPoints = this.add.text(this.points.x,this.points.y,'0',
        {
            fontSize : 27,
            align : 'center',
            color : '#263e71',
            fontStyle : 'bold'
        });



        this.logo.setOrigin(0.5,0);
        this.backframe.setOrigin(0,0);
        this.btnSpin.setInteractive();
        this.textPoints.setOrigin(0.5,0.5);
     
        this.registry.events.on('spin',() =>
        {
            this.SpinResults = this.wrapper.spin();
            console.log(this.SpinResults);

            console.log('puntos: ' + this.SpinResults.winnings);

            this.textPoints.setText(this.SpinResults.winnings);
        });

        this.btnSpin.on("pointerdown", () =>
        {
            this.registry.events.emit('spin');    
        });
    }
}


export default Scn_play;

