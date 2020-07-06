import symbol from '../gameObject/symbol.js'
class Scn_play extends Phaser.Scene
{
    constructor()
    {
        super({key: "Scn_play"});
    }
    name()
    {
        console.log("name");
    }
    create()
    {
        // console.log(wrapper.getReels());

        //Logo
        this.logo = this.add.image(this.sys.game.config.width/2,5,"logo");
        this.logo.setOrigin(0.5,0);

        //Back
        this.backframe = this.add.image(0,80,"backFrame");
        this.backframe.setOrigin(0,0);

        //boton
        this.btnSpin = this.add.sprite(this.sys.game.config.width/2 + 150,this.sys.game.config.height - 50,"button");
        this.btnSpin.setInteractive();

        //puntos
        this.points = this.add.image(95,this.sys.game.config.height - 50,'prizeWindow');
        this.textPoints = this.add.text(this.points.x,this.points.y,'prize: $0',
        {
            fontSize : 20,
            align : 'center',
            color : '#263e71',
            fontStyle : 'bold',
            fontFamily : 'arialblk'
        });
        this.textPoints.setOrigin(0.5,0.5);
        
        //Symbols
        this.symbola = new symbol(this,100,300,"syma","a");
        this.symbolb = new symbol(this,150,300,"symb","b");
        this.symbolc = new symbol(this,200,300,"symc","c");
        this.symbold = new symbol(this,250,300,"symd","d");
        this.symbole = new symbol(this,300,300,"syme","e");
        
        //lines prize
        this.posLine1x = this.backframe.x + 20;
        this.posLine1y = this.backframe.y + 80;
        this.posLine2y = this.backframe.y + 240;
        this.posLine3y = this.backframe.y + 410;

        this.line1 = this.add.image(this.posLine1x,this.posLine1y,'line1');
        this.line1.setOrigin(0,0.5);

        this.line4 = this.add.image(this.posLine1x+10,110,'line4');
        this.line4.setOrigin(0,0);

        this.line5 = this.add.image(this.posLine1x+10,110,'line5');
        this.line5.setOrigin(0,0);
        
        this.line1.setVisible(false);
        this.line4.setVisible(false);
        this.line5.setVisible(false);

        this.registry.events.on('cleanLine',()=>
        {
            this.line1.setVisible(false);
            this.line4.setVisible(false);
            this.line5.setVisible(false);
        });

        this.registry.events.on('setLine',(lineId) =>
        {
            switch(lineId)
            {
                case 0:
                    this.line1.setVisible(true);
                    this.line1.setY(this.posLine2y);
                break;
                case 1:
                    this.line1.setVisible(true);
                    this.line1.setY(this.posLine1y);
                break;
                case 2:
                    this.line1.setVisible(true);
                    this.line1.setY(this.posLine3y);
                break;
                case 3:
                    this.line4.setVisible(true);
                break;
                case 4:
                    this.line5.setVisible(true);
                break;
            }
        });

        this.registry.events.on('spin',() =>
        {
            this.registry.events.emit('cleanLine');
            this.SpinResults = wrapper.spin();

            console.log(this.SpinResults);
            this.prize = wrapper.getPrizes(this.SpinResults.stopPoints)

            for(var i = 0; i < this.prize.length; i++)
            {
                this.registry.events.emit('setLine',(this.prize[i].lineId));
                console.log(this.prize[i].lineId);
            }
            debugger;
            this.textPoints.setText('WIN: $'+this.SpinResults.winnings);
        });

        this.input.on('pointerover',function (event,gameObjects)
        {
            gameObjects[0].setTint(0x7a7a7a);
        });

        this.input.on('pointerout',function (event,gameObjects)
        {
            gameObjects[0].clearTint();
        });

        this.btnSpin.on("pointerdown", () =>
        {
            this.registry.events.emit('spin');    
        });

    }

   

}

export default Scn_play;

