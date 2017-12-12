import {Vec2} from './math.js'

function intToGrid(int, itemsWide) {
    const row = Math.floor(int / itemsWide)
    const col = int - (row * itemsWide)

    return {x: col, y: row};
}



export default class SpriteSelector {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.pos = new Vec2(x, y) 
        this.selected; 
        this.itemsWide = 4; 
        this.grid = []; 
    }

    arrayToGrid(array, itemsWide) {
        const buffer = [];
        array.forEach((item, nr) => {
            const row = Math.floor(nr / this.itemsWide);
            const col = nr - (row * this.itemsWide);
            buffer.push({name: item.name, dx: col, dy: row, spriteX: item.x, spriteY: item.y});
        })
        return buffer;
    }


    createGrid(){
        this.grid = this.arrayToGrid(this.sprite.tiles);
        this.selected = this.grid[0].name;
    }

    drawSelector(context) {

        const sprite = this.sprite;

        this.grid.forEach((container, nr)=>{
            const offsetX = (sprite.width * container.dx) + this.pos.x;
            const offsetY = (sprite.width * container.dy) + this.pos.y;

            context.drawImage(
                sprite.image, 
                container.spriteX, container.spriteY, 
                sprite.width, sprite.height, 
                offsetX, offsetY, 
                sprite.width, sprite.width
            );

        });

    }



    drawHoverSquare(context, mouse) {
        const sprite = this.sprite;

        const originX = mouse.pos.x - this.pos.x;
        const originY = mouse.pos.y - this.pos.y;
        
        const tileHover = {
            x: Math.floor(originX/this.sprite.width),
            y: Math.floor(originY/this.sprite.height)
        }

        this.grid.forEach(container => {
            if (tileHover.x === container.dx && tileHover.y  === container.dy ) {
                const offsetX = (sprite.width * container.dx) + this.pos.x;
                const offsetY = (sprite.width * container.dy) + this.pos.y;

                context.strokeStyle = 'red'
                context.beginPath();
                context.rect(
                    offsetX, offsetY, 
                    sprite.width, sprite.height
                )
                context.stroke()

                if (mouse.click) {
                    this.selected = container.name;
                }
            }
        })
    }

    drawSelectedSquare(context, x, y, size = 4) {
        const border = 3;
        context.strokeStyle = '#FFF';
        context.beginPath();
        context.rect(
            x - border, y - border,
            this.sprite.width*size + border*2, this.sprite.height*size + border*2
        )
        context.stroke()


        if(this.selected) {
            this.sprite.drawTileName(context, this.selected, x, y, size)
        }
    }

    draw(context, mouse) {
        this.drawSelector(context)
        this.drawHoverSquare(context, mouse, 0, 0)
        this.drawSelectedSquare(context, 300, 100)
    }


}