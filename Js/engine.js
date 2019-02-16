export default class
{
    constructor(game)
    {
        this.game = game;
    }

    update()
    {
        let $this = this;
        $this.game.update(0.0);
    }

    draw()
    {
        let $this = this;
        $this.game.draw(0.0);    
    }

    initLoop()
    {
        let $this = this;
        $this.game.init();
        
        requestAnimationFrame(() => $this.loop($this));
    }

    loop($this)
    {
        $this.update();
        $this.draw();
        requestAnimationFrame(() => $this.loop($this));
    }
}