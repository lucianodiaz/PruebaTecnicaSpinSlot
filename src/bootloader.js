class Bootloader extends Phaser.Scene
{
    constructor()
    {
        super({key: "Bootloader"});
    }

    preload()
    {
        this.load.on("complete",() => 
        {
            this.scene.start("Scn_play");
        });
        
        //this.load.image("button","./assets/btn_spin.png");
        this.load.image("backFrame","./assets/frame.png");
        this.load.image("line1","./assets/line_1.png");
        this.load.image("line4","./assets/line_4.png");
        this.load.image("line5","./assets/line_5.png");
        this.load.image("logo","./assets/logo_mobile.png");
        this.load.image("prizeWindow","./assets/prize_window.png");
        this.load.image("button", "./assets/btn_spin.png");
        this.load.image("syma","./assets/symbols/sym_a.png");
        this.load.image("symb","./assets/symbols/sym_b.png");
        this.load.image("symc","./assets/symbols/sym_c.png");
        this.load.image("symd","./assets/symbols/sym_d.png");
        this.load.image("syme","./assets/symbols/sym_e.png");
    }
}

export default Bootloader;