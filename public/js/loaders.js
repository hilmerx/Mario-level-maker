import SpriteSheet from './SpriteSheet.js';
import SpriteSelector from './SpriteSelector.js';
import Level from './Level.js';


function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.src = url;
        image.onload = function() {
            resolve(image);
        }
    });
}

function loadJSON(url) {
    return fetch(url)
        .then(json => {
            return json.json();
        })
}

function loadBackgroundSprites() {
    return Promise.all([
            loadJSON('./json/background.json'),
            loadImage('./img/tiles.png')
        ])
        .then(([tileSpec, image]) => {
            const sprite = new SpriteSheet(image, 16, 16);

            sprite.defineTiles(tileSpec)

            return sprite;
        })
}

export function createSpriteSelector() {
    return loadBackgroundSprites()
        .then(sprite => {
            const selector = new SpriteSelector(sprite, 100, 100);
            selector.createGrid()
            return selector;
        })

}

