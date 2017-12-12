import {Vec2} from './math.js'

export default class Level {
    constructor(x, y) {
        this.pos = new Vec2(x, y) 

        this.windowWidth = 800
        this.windowHeight = 240

        this.levelWidth = 1600;
        this.tileWidth  = 16;

        this.viewX = 0


        this.cols = this.levelWidth / this.tileWidth
        this.rows = this.windowHeight / this.tileWidth
        this.levelSpec  = {backgrounds: []};
        this.floodFillFlag = false;
        this.grid = []

        this.scrollBar = new ScrollBar(this.pos.x, this.pos.y + this.windowHeight + 5, this.windowWidth)

        this.events()


    }


    events() {
        this.grid = this.makeGrid(this.rows, this.cols)
    }

    makeGrid(rows, cols) {
          let arr = new Array(cols);

          for (let i = 0; i<arr.length; i++){
            arr[i] = new Array(rows);
          }

          return arr;
    }

    hoverRect(context, mouse, selector) {

        const originX = mouse.pos.x - this.pos.x;
        const originY = mouse.pos.y - this.pos.y;
        
        const tileHover = {
            x: Math.floor((originX + this.viewX)/this.tileWidth),
            y: Math.floor(originY/this.tileWidth)
        }


        if (originY >= 0 &&  originY < this.windowHeight && originX >= 0 &&  originX < this.windowWidth) {
            const offsetX = (this.tileWidth * tileHover.x) + this.pos.x;
            const offsetY = (this.tileWidth * tileHover.y) + this.pos.y;

            context.strokeStyle = 'red'
            context.beginPath();
            context.rect(
                offsetX - this.viewX, offsetY, 
                this.tileWidth, this.tileWidth
            )
            context.stroke()

            if (mouse.buttons === 1 && !this.scrollBar.isGrabbing) {
                this.checkForTile(tileHover.x, tileHover.y, selector.selected)
            }
        }
    }

    checkForTile(x, y, tileName) {
        if (this.floodFillReady) {
            this.floodFill(newTileObj)
        } else {
            this.grid[x][y] = tileName;
        }
    }

    floodFill(tileObj) {


    }


    draw(context, mouse, selector) {
        this.drawLevelBackground(context)
        this.drawLevel(context, selector)
        this.hoverRect(context, mouse, selector)
        this.scrollBar.drawScrollBar(context)
        this.scrollBar.dragScrollbar(mouse)
        console.log(this.grid);

        this.viewX = this.scrollBar.value * (this.levelWidth - this.windowWidth)
    }

    update(context, mouse, selector) {
        this.dragScrollbar(mouse)
    }

    drawLevelBackground(context){
        context.fillStyle = '#ddd';
        context.fillRect(
            this.pos.x, this.pos.y,
            this.windowWidth, this.windowHeight
        );
    }

    drawLevel(context, selector) {
        const level = this.levelSpec.backgrounds;

        if(this.grid.length > 0) {

            this.grid.forEach((col, nr)=> {
                const x = nr * this.tileWidth + this.pos.x - this.viewX;

                col.forEach((obj, nr) => {
                    const y = nr * this.tileWidth + this.pos.y;

                    selector.sprite.drawTileName(context, obj, x, y, 1)
                })
            })

        }
    }
}

class ScrollBar{
    constructor(x, y, width) {
        this.pos = new Vec2(x, y)
        this.width = width;
        this.scrollHeight = 10;
        this.faderWidth = 30;
        this.value = 0;
        this.travelLength = this.width - this.faderWidth;
        this.isGrabbing = false
        this.grabPoint = 0;
    }

    drawScrollBar(context) {

        context.fillStyle = '#aaa';
        context.fillRect(
            this.pos.x, this.pos.y,
            this.width, this.scrollHeight
        );


        context.fillStyle = '#444';
        context.fillRect(
            this.travelLength * this.value, this.pos.y,
            this.faderWidth, this.scrollHeight
        );
    }

    dragScrollbar(mouse) {
        const rel = {
            x: mouse.pos.x - this.pos.x,
            y: mouse.pos.y - this.pos.y
        }

            // console.log(originX, originY);


        const isOnFader = this.isOnFaderFunc(mouse)
        

        if (mouse.buttons === 1 && isOnFader && !this.isGrabbing) {
            this.isGrabbing = true;
            this.grabPoint = mouse.pos.x - this.travelLength * this.value;
        } else if (mouse.buttons === 0) {
            this.isGrabbing = false;
        }

        // if(this.isGrabbing && mouse.pos.x-this.grabPoint >= 0 && mouse.pos.x-this.grabPoint <= this.travelLength) {
        if(this.isGrabbing) {
            if (mouse.pos.x-this.grabPoint <= 0) {
                this.value = 0;
            } else if (mouse.pos.x-this.grabPoint >= this.travelLength) {
                this.value = 1;
            } else {
                this.value = (mouse.pos.x-this.grabPoint)/ this.travelLength;
            }
        }
    }

    isOnFaderFunc(mouse) {

        const fader = {
            x1: this.travelLength * this.value,
            x2: this.travelLength * this.value + this.faderWidth,
            y1: this.pos.y,
            y2: this.pos.y + this.scrollHeight
        }

        if (mouse.pos.x >= fader.x1 && mouse.pos.x <= fader.x2 && mouse.pos.y >= fader.y1 && mouse.pos.y <= fader.y2) {
            return true;
        } else {
            return false;
        }

    }

}