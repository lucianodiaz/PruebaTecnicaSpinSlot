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

        //console.log(this.barGroup);
        this.barGroup.children.entries.map((element) =>
        {
            element.x += 95;
            element.y += 95;
            element.stepX = 50;
            element.setScale(0.9);
            element.setInteractive();
            // element.on("pointerdown", () =>
            // {
            //     //this.registry.events.emit('spin',this.bar1,this.bar2,this.bar3);    
            //     element.alpha = 0.0;
            // });
            if(element.y > 530){element.setVisible(false)};
        });

        this.bar1 = this.add.group();
        this.bar2 = this.add.group();
        this.bar3 = this.add.group();

        this.backY = this.backframe.y + 450;
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
        console.log(this.bar1);
        console.log(this.bar2);
        console.log(this.bar3);
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
        this.posLine1y = this.backframe.y + 90;
        this.posLine2y = this.backframe.y + 240;
        this.posLine3y = this.backframe.y + 400;

        this.line1 = this.add.image(this.posLine1x,this.posLine1y,'line1');
        this.line1.setOrigin(0,0.5);

        this.line2 = this.add.image(this.posLine1x,this.posLine2y,'line1');
        this.line2.setOrigin(0,0.5);

        this.line3 = this.add.image(this.posLine1x,this.posLine3y,'line1');
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

        this.registry.events.on('spinBar',(idSymbolReel) =>
        {
            //Bar: el bar que se va a 'girar' 
            //Reel: con el que se va a comparar al Bar
            //idSymbolReel: id del simbolo dentro del reel
            
            this.Bar;
            switch(idSymbolReel)
            {
                case 0:
                    this.Bar = this.bar1;
                break;
                case 1:
                    this.Bar = this.bar2;
                break;
                case 2:
                    this.Bar = this.bar3;
                break;
            }
            for(var i=0; i<this.Bar.children.entries.length;i++)
            {
                this.Bar.children.entries[i].layout = false;
            }
            // console.log('------------------------------');
            // console.log(this.Bar);
             console.log(this.reelsLayout[idSymbolReel]);
            // console.log(idSymbolReel);
            // console.log('------------------------------');
            for(var i=0; i< this.Bar.children.entries.length;i++)
            {
                // console.log('primer dato a comparar');
                // console.log(this.Bar.children.entries[i].code);
                // console.log(this.reelsLayout[idSymbolReel][0]);
                // console.log('------------------------');
                if(this.Bar.children.entries[i].code == this.reelsLayout[idSymbolReel][0])
                {
                    var j = i;
                    if(j + 1 == 20)
                    {
                        //En esta seccion verifica que si ha llegado a la posicion 20, eso quiere decir que va a seleccionar la pos 0 y luego la 1
                        //console.log('es mas de 20');
                        j = 0;
                        if(this.Bar.children.entries[j].code == this.reelsLayout[idSymbolReel][1])
                        {
                            //console.log('segunda coincidencia');
                            // j++;
                            if(this.Bar.children.entries[j+1].code == this.reelsLayout[1][2])
                            {
                                //console.log('tercera coincidencia');
                                this.Bar.children.entries[j+1].layout = true;
                                this.Bar.children.entries[j].layout = true;
                                this.Bar.children.entries[i].layout = true;
                                this.Bar.children.entries[j+1].y = 475;
                                this.Bar.children.entries[j].y = 325;
                                this.Bar.children.entries[i].y = 175;
                                break;
                            }
                            else
                            {
                                this.Bar.children.entries[j+1].y = 3025;
                            }
                        }
                        else
                        {
                            this.Bar.children.entries[j].y = 3025;
                        }
                    }
                    else
                    {
                        // console.log('segundo dato a comparar');
                        // console.log(this.Bar.children.entries[i+1].code);
                        // console.log(this.reelsLayout[idSymbolReel][1]);
                        // console.log('------------------------');
                        if(this.Bar.children.entries[i+1].code == this.reelsLayout[idSymbolReel][1])
                        {
                            console.log(i+2);
                            var j = i; // esto es por si se sale del rango del Array
                            if( j+2 == 20)
                            {
                                j =0;
                            }
                            else if(j + 2 == 21)
                            {
                                j = 1;
                            }
                            else
                            {
                                j +=2;
                            }
                            // console.log('tercer dato a comparar');
                            // console.log(this.Bar.children.entries[j].code);
                            // console.log(this.reelsLayout[idSymbolReel][2]);
                            // console.log(this.Bar.children.entries[j]);
                            // console.log('------------------------');
                            if(this.Bar.children.entries[j].code ==this.reelsLayout[idSymbolReel][2])
                             {
                                this.Bar.children.entries[j].y = 475;
                                this.Bar.children.entries[i+1].y = 325;
                                this.Bar.children.entries[i].y = 175;
                                break;
                             }
                             else
                             {
                                // console.log('no encontro tercera referencia');
                                //this.Bar.children.entries[i+2].y = 3025;
                             }
                        }
                        else
                        {
                            //console.log('No encontro la segunda referencia');
                            //this.Bar.children.entries[i+1].y = 3025;
                        }
                    }
                }
                else
                {
                    //this.Bar.children.entries[i].y = 3025;
                    //this.Bar.children.entries[i].setVisible(false);
                }
            }
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

        this.registry.events.on('spin',(bar1,bar2,bar3) =>
        {
            this.registry.events.emit('cleanLine');
            this.SpinResults = wrapper.spin();
            console.log(this.SpinResults);
            this.prize = wrapper.getPrizes(this.SpinResults.stopPoints)
            this.reelsLayout = this.SpinResults.reelsLayout;
            this.registry.events.emit('spinBar',0);
            this.registry.events.emit('spinBar',1);
            this.registry.events.emit('spinBar',2);
            for(var i = 0; i < this.prize.length; i++)
            {
                this.registry.events.emit('setLine',(this.prize[i].lineId));
                //console.log(this.prize[i].lineId);
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
            this.registry.events.emit('spin',this.bar1,this.bar2,this.bar3);    
        });

    }


    update()
    {
        // this.velocity = 15;
        // for(var i = 0; i < this.bar1.children.entries.length; i++)
        // {
        //     this.bar1.children.entries[i].y +=  this.velocity;
        //     if(this.bar1.children.entries[i].y >= 3165)
        //     {
        //         this.bar1.children.entries[i].y = 175;
        //     }
        // }
        // for(var i = 0; i < this.bar2.children.entries.length; i++)
        // {
        //     this.bar2.children.entries[i].y +=  this.velocity;
        //     if(this.bar2.children.entries[i].y >= 3165)
        //     {
        //         this.bar2.children.entries[i].y = 175;
        //     }
        // }
        // for(var i = 0; i < this.bar3.children.entries.length; i++)
        // {
        //     this.bar3.children.entries[i].y +=  this.velocity;
        //     if(this.bar3.children.entries[i].y >= 3165)
        //     {
        //         this.bar3.children.entries[i].y = 175;
        //     }
        // }
        this.bar1.children.entries.map((element) =>
        {
            if(element.y > 480)
            {
                element.setVisible(false);
            }
            if(element.y < 510 && element.y >= 165)
            {
                element.setVisible(true);
            }
        });
        this.bar2.children.entries.map((element) =>
        {
            if(element.y > 530)
            {
                element.setVisible(false);
            }
            if(element.y < 530 && element.y >= 175)
            {
                element.setVisible(true);
            }
        });
        this.bar3.children.entries.map((element) =>
        {
            if(element.y > 530)
            {
                element.setVisible(false);
            }
            if(element.y < 530 && element.y >= 175)
            {
                element.setVisible(true);
            }
        });
    }
   

}

export default Scn_play;

