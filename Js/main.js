
import Engine from "./engine.js";
import Game from "./game.js";

window.initGame = function()
{
    let engine = new Engine(new Game());
    engine.initLoop();
}
