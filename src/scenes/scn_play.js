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
            element.setInteractive();
            element.on("pointerdown", () =>
            {
                //this.registry.events.emit('spin',this.bar1,this.bar2,this.bar3);    
                console.log(element.layout);
            });
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

        //variables
        this.velocityBar1 = 0;
        this.velocityBar2 = 0;
        this.velocityBar3 = 0;
        this.reel1Count = 0;
        this.reel2Count = 0;
        this.reel3Count = 0;
        this.prize = [];
        this.reelsLayout = [];
        this.stopBar1 = false;
        this.stopBar2 = false;
        this.stopBar3 = false;
        this.timedLoopSpin = this.time.addEvent(
            {
                delay:0,
                callback: this.onStartUpdate,
                callbackScope:this,
                loop:false,
                repeat: -1
            });
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
                    this.line2.setVisible(true);
                break;
                case 1:
                    this.line1.setVisible(true);
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
            this.textPoints.setText('WIN: $'+0);
            this.stopBar1 = false;
            this.stopBar2 = false;
            this.stopBar3 = false;
            this.btnSpin.setVisible(false);
            this.registry.events.emit('cleanLine');
            this.reel1Count = 0;
            this.reel2Count = 0;
            this.reel3Count = 0;
            this.SpinResults = wrapper.spin();
            console.log(this.SpinResults);
            this.prize = wrapper.getPrizes(this.SpinResults.stopPoints)
            this.timedEventPrize = this.time.delayedCall(100,this.getReelLayout,[this.SpinResults.reelsLayout],this);
            //this.reelsLayout = this.SpinResults.reelsLayout;
            this.timedLoopSpin.loop = true;
            this.timedLoopSpin.paused = false;
            this.timedLoopSpin.repeat = 1;
            this.timedEvent1 = this.time.delayedCall(200,this.spinBar,[0],this);
            this.timedEvent2 = this.time.delayedCall(300,this.spinBar,[1],this);
            this.timedEvent3 = this.time.delayedCall(500,this.spinBar,[2],this);
            
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
    getReelLayout(r)
    {
        this.reelsLayout = r;
    }

    spinBar(idSymbolReel)
    {
            this.Bar;
            switch(idSymbolReel)
            {
                case 0:
                    this.Bar = this.bar1;
                    this.velocityBar1 = .08;
                    this.timerstopBar1 = this.time.addEvent(
                        {
                            delay: 1000,
                            callback: this.onStop(0),
                            callbackScope: this
                        });
                break;
                case 1:
                    this.Bar = this.bar2;
                    this.velocityBar2 = .08;
                    this.timerstopBar2 = this.time.addEvent(
                        {
                            delay: 1000,
                            callback: this.onStop(1),
                            callbackScope: this
                        });
                break;
                case 2:
                    this.Bar = this.bar3;
                    this.velocityBar3 = .08;
                    this.timerstopBar3 = this.time.addEvent(
                        {
                            delay: 1000,
                            callback: this.onStop(2),
                            callbackScope: this
                        });
                break;
            }
            for(var i=0; i<this.Bar.children.entries.length;i++)
            {
                this.Bar.children.entries[i].layout = false;
            }
            for(var i=0; i< this.Bar.children.entries.length;i++)
            {
                if(this.Bar.children.entries[i].code == this.reelsLayout[idSymbolReel][0])
                {
                    var j = i; // esto es por si se sale del rango del Array
                    if(j == 19)
                    {
                        //console.log('llego a: ' + j);
                        j = 0;
                        if(this.Bar.children.entries[j].code == this.reelsLayout[idSymbolReel][1])
                        {
                            //console.log('segunda coincidencia');
                            // j++;
                            if(this.Bar.children.entries[j+1].code == this.reelsLayout[idSymbolReel][2])
                            {
                                //console.log('tercera coincidencia');
                                this.Bar.children.entries[j+1].layout = true;
                                this.Bar.children.entries[j].layout = true;
                                //console.log(i);
                                this.Bar.children.entries[i].layout = true;
                                break;
                            }
                            else
                            {
                                //this.Bar.children.entries[j+1].y = 3025;
                            }
                        }
                    }  
                    else if(j + 1 == 20)
                    {
                        //En esta seccion verifica que si ha llegado a la posicion 20, eso quiere decir que va a seleccionar la pos 0 y luego la 1
                        //console.log('es mas de 20');
                        j = 0;
                        if(this.Bar.children.entries[j].code == this.reelsLayout[idSymbolReel][1])
                        {
                            //console.log('segunda coincidencia');
                            // j++;
                            if(this.Bar.children.entries[j+1].code == this.reelsLayout[idSymbolReel][2])
                            {
                                //console.log('tercera coincidencia');
                                this.Bar.children.entries[j+1].layout = true;
                                this.Bar.children.entries[j].layout = true;
                                //console.log(i);
                                this.Bar.children.entries[i-1].layout = true;
                                break;
                            }
                            else
                            {
                                //this.Bar.children.entries[j+1].y = 3025;
                            }
                        }
                        else
                        {
                            //this.Bar.children.entries[j].y = 3025;
                        }
                    }
                    else if(j + 1 == 21)
                    {
                        j=1;
                        if(this.Bar.children.entries[j].code == this.reelsLayout[idSymbolReel][1])
                        {
                            //console.log('segunda coincidencia');
                            // j++;
                            if(this.Bar.children.entries[j+1].code == this.reelsLayout[idSymbolReel][2])
                            {
                                //console.log('tercera coincidencia');
                                this.Bar.children.entries[j+1].layout = true;
                                this.Bar.children.entries[j].layout = true;
                                this.Bar.children.entries[i].layout = true;
                                break;
                            }
                            else
                            {
                                //this.Bar.children.entries[j+1].y = 3025;
                            }
                        }
                    }
                    else
                    {    
                        //console.log(i+1);
                        
                        if(this.Bar.children.entries[i+1].code == this.reelsLayout[idSymbolReel][1])
                        {
                            //console.log(i+2);
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
                            if(this.Bar.children.entries[j].code ==this.reelsLayout[idSymbolReel][2])
                             {
                                this.Bar.children.entries[j].layout = true;
                                this.Bar.children.entries[i+1].layout = true;
                                this.Bar.children.entries[i].layout = true;
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
    }

    onStop(idBar)
    {
        //console.log(idBar);
        switch(idBar)
        {
            case 0:
                this.stopBar1 = true;
                //this.velocityBar1 = 0;
                break;
            case 1:
                this.stopBar2 = true;
                //this.velocityBar2 = 0;
                break;
            case 2:
                this.stopBar3 = true;
                //this.velocityBar3 = 0;
                break;
        }
    }
   setBarVelocity(idBar)
   {
        switch(idBar)
        {
            case 0:
                this.velocityBar1 = 0;
                break;
            case 1:
                this.velocityBar2 = 0;
                break;
            case 2:
                this.velocityBar3 = 0;
                break;
        }

   }
    outOfLimit(bar)
    {
        //console.log(bar);
        bar.children.entries.map((element) =>
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
    }

    onStartUpdate()
    {
        //console.log('falso update');
        this.SpinUpdate(this.bar1,0,this.velocityBar1,this.stopBar1,0);
        this.SpinUpdate(this.bar2,1,this.velocityBar2,this.stopBar2,this.velocityBar1);
        this.SpinUpdate(this.bar3,2,this.velocityBar3,this.stopBar3,this.velocityBar2);
    }
    SpinUpdate(bar,idBar,velocityBar,stop,otherBarVelocityStop)
    {
        for(var i = 0; i < bar.children.entries.length; i++)
            {
                bar.children.entries[i].y +=  velocityBar * bar.children.entries[i].height;
                if(bar.children.entries[i].y >= 3200)
                {
                    //console.log('hacia arriba');
                    bar.children.entries[i].y = 175;
                }
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
                if(bar.children.entries[j].layout == true && bar.children.entries[j].y >= 475 && bar.children.entries[j].y <= 500)
                {
                    if(bar.children.entries[i].layout == true && stop && otherBarVelocityStop == 0)
                    {
                        //velocityBar = 0;
                        this.setBarVelocity(idBar);
                        bar.children.entries[j].y = 475;
                        if(j-1 <= 0)
                        {
                            j = 19;
                        }
                        else
                        {
                            j -= 1;
                        }
                        bar.children.entries[j].y = 325;
                        bar.children.entries[i].y = 175;
                    }
                }   
            }
    }

    update()
    {
        if(this.stopBar1 && this.stopBar2 && this.stopBar3 && this.btnSpin.visible == false &&
            this.velocityBar1 == 0 && this.velocityBar2 == 0 && this.velocityBar3 == 0)
        {
            this.timedLoopSpin.loop = false;
            for(var i = 0; i < this.prize.length; i++)
            {
                this.registry.events.emit('setLine',(this.prize[i].lineId));
                this.textPoints.setText('WIN: $'+this.SpinResults.winnings);
            }
            this.btnSpin.setVisible(true);
        }
 
        this.outOfLimit(this.bar1);
        this.outOfLimit(this.bar2);
        this.outOfLimit(this.bar3);
    }
   

}

export default Scn_play;

