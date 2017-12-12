import {Vec2} from './math.js'

export default class SpriteSheet {
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = [];
    }

    defineTiles(tileSpec) {
        tileSpec.tiles.forEach(tile =>{

            const buffer = {
            'name' : tile.name,
            'x' : tile.pos[0] * this.width,
            'y' : tile.pos[1] * this.height
        };

        this.tiles.push(buffer);
        })
    }

    drawTileName(context, name, dx, dy, sizeMultiplier) {
        this.tiles.forEach(tile => {

            if (tile.name === name) {


                context.drawImage(
                    this.image, 
                    tile.x, tile.y, 
                    this.width, this.height, 
                    dx, dy, 
                    this.width*sizeMultiplier, this.width*sizeMultiplier);
                }
        })
    }
}
