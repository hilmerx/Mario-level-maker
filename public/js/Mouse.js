import {Vec2} from './math.js'

export default class Mouse {

    constructor(focus) {
        this.pos = new Vec2(0, 0)
        this.buttons;
        this.click = false;

        this.events(focus)
    }

    events(canvas) {
        ['mousemove', 'click', 'mouseup', 'mousedown'].forEach(eventName => {
            canvas.addEventListener(eventName, event => {
                this.pos.set(event.offsetX, event.offsetY);
                this.buttons = event.buttons;
                this.click = false;

                if (eventName === 'click') {                    
                    this.click = true;

                }
            });
        });
    }

    update() {
        this.click = false;
    }
}