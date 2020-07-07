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
        
        // //Symbols
        this.barGroup = this.add.group();

        this.reels = wrapper.getReels()
        
        for(var i = 0;i<this.reels.length;i++)
        {
            
           // console.log('bar' + this.reels[i]);
            for(var j = 0; j<this.reels[i].length;j++)
            {
                // this.groupWraper = this.add.group();    
                //console.log('wrapper' + this.reels[i][j]);
                var offsety = 150;
                var offsetx = 150;
                switch(this.reels[i][j])
                {
                    case "a":
                        //console.log('a');
                        var image = new symbol(this,(this.backframe.x + offsetx * i),(this.backframe.y + offsety *j),"syma","a");
                        this.barGroup.add(image);
                    break;
                    case "b":
                        //console.log('b');
                        var image = new symbol(this,(this.backframe.x + offsetx * i),(this.backframe.y + offsety *j),"symb","b");
                        this.barGroup.add(image);
                    break;
                    case "c":
                        //console.log('c');
                        var image = new symbol(this,(this.backframe.x + offsetx* i),(this.backframe.y + offsety *j),"symc","c");
                        this.barGroup.add(image);
                    break;
                    case "d":
                        //console.log('d');
                        var image = new symbol(this,(this.backframe.x + offsetx* i),(this.backframe.y + offsety *j),"symd","d");
                        this.barGroup.add(image);
                    break;
                    case "e":
                        //console.log('e');
                        var image = new symbol(this,(this.backframe.x + offsetx* i),(this.backframe.y + offsety *j),"syme","e");
                        this.barGroup.add(image);
                    break;
                }
                  
            }
            
        }

        console.log(this.barGroup);
        this.barGroup.children.entries.map((element) =>
        {
            element.x += 95;
            element.y += 95;
            element.stepX = 50;
            element.setScale(0.9);
        });

        this.bar1 = this.add.group();
        this.bar2 = this.add.group();
        this.bar3 = this.add.group();

        for(var i=0;i<20;i++)
        {
            this.bar1.add(this.barGroup.children.entries[i]);

        }
        for(var i=20;i<40;i++)
        {
            this.bar2.add(this.barGroup.children.entries[i]);
        }
        for(var i=40;i<60;i++)
        {
            this.bar3.add(this.barGroup.children.entries[i]);
        }
           //boton
           this.btnSpin = this.add.sprite(this.sys.game.config.width/2 + 150,this.sys.game.config.height - 50,"button");
           this.btnSpin.setInteractive();
   
           //puntos
           this.points = this.add.image(95,this.sys.game.config.height - 50,'prizeWindow');
           this.textPoints = this.add.text(this.points.x,this.points.y,'WIN: $0',
           {
               fontSize : 23,
               align : 'center',
               color : '#263e71',
               fontStyle : 'bold',
               fontFamily : 'Arial'
           });
           this.textPoints.setOrigin(0.5,0.5);     
        
        //lines prize
        this.posLine1x = this.backframe.x + 20;
        this.posLine1y = this.backframe.y + 80;
        this.posLine2y = this.backframe.y + 240;
        this.posLine3y = this.backframe.y + 410;

        this.line1 = this.add.image(this.posLine1x,this.posLine1y,'line1');
        this.line1.setOrigin(0,0.5);

        this.line2 = this.add.image(this.posLine1x,this.posLine1y,'line1');
        this.line2.setOrigin(0,0.5);

        this.line3 = this.add.image(this.posLine1x,this.posLine1y,'line1');
        this.line3.setOrigin(0,0.5);

        this.line4 = this.add.image(this.posLine1x+10,110,'line4');
        this.line4.setOrigin(0,0);

        this.line5 = this.add.image(this.posLine1x+10,110,'line5');
        this.line5.setOrigin(0,0);
        
        this.line1.setVisible(false);
        this.line2.setVisible(false);
        this.line3.setVisible(false);
        this.line4.setVisible(false);
        this.line5.setVisible(false);

        this.registry.events.on('cleanLine',()=>
        {
            this.line1.setVisible(false);
            this.line2.setVisible(false);
            this.line3.setVisible(false);
            this.line4.setVisible(false);
            this.line5.setVisible(false);
        });

        this.registry.events.on('setLine',(lineId) =>
        {
            switch(lineId)
            {
                case 0:
                    this.line1.setVisible(true);
                break;
                case 1:
                    this.line2.setVisible(true);
                break;
                case 2:
                    this.line3.setVisible(true);
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

