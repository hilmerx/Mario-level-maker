import SpriteSheet from './SpriteSheet.js';
import Mouse from './Mouse.js';
import {createSpriteSelector} from './loaders.js';
import Level from './Level.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;


Promise.all([
        createSpriteSelector(),
    ])
.then(([selector]) => {
    const mouse = new Mouse(canvas);
    const background = new Background();
    const level = new Level(0, 400)


    function update() {
        background.draw();
        selector.draw(context, mouse);
        level.draw(context, mouse, selector)
        mouse.update()
        
        requestAnimationFrame(update);
    }

    update();
})


class Background {

    constructor(){

    }

    draw() {
        context.fillStyle = "#22f";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "red";
        context.font = '48px Arial';

        const hw = "MARIO LEVEL MAKER";
        context.fillText(hw, 10, 50);
    }

};
