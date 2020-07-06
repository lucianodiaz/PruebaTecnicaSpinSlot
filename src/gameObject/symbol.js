class symbol extends Phaser.GameObjects.Sprite
{
    code;
    constructor(scene,x,y,type,sym)
    {
        super(scene,x,y,type);
        this.code = sym;
        scene.add.existing(this);
    }
    
}

export default symbol;