class symbol extends Phaser.GameObjects.Sprite
{
    code;
    layout;
    constructor(scene,x,y,type,sym)
    {
        super(scene,x,y,type);
        this.code = sym;
        this.layout = false;
        scene.add.existing(this);
    }
    
}

export default symbol;