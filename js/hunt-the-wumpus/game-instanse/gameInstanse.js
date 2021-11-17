import Player from "../units/player.js";
import Wumpus from '../units/wumpus.js';
import Bat from '../units/bat.js';
import Hole from '../units/hole.js';
import Animation from "../game-animations/animation.js";
import Helper from "../helper/helper.js"

export default class GameInstanse {
    constructor() {
        this.mapW = 22;
        this.mapH = 12;

        this.player = new Player(3, 3);

        this.enemies = [
            new Wumpus(),
            new Bat(),
            new Bat(),
            new Bat(),
            new Bat(),
            new Bat(),
            new Bat(),
            new Hole(),
            new Hole(),
            new Hole(),
            new Hole(),
            new Hole(10, 10),
            new Hole(2, 6),
            new Hole(17, 8)
        ];

        this.map = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]

        this.animation = [
            new Animation('img/sword.png', 3, this.player.posX, this.player.posY)
        ];

        this.#setValidLocation();
    }

    getGameMapLocation(x, y) {
        return this.map[y * this.mapW + x];
    }

    #setValidLocation() {
        this.enemies.forEach((enemy) => {
            let currentLocation = this.getGameMapLocation(enemy.posX, enemy.posY);
            if (currentLocation == 1) { return; }

            let newX = 0;
            let newY = 0;
            let isLocationValid = false;

            while (isLocationValid == false) {
                newX = Helper.getRandomInt(0, this.mapW);
                newY = Helper.getRandomInt(0, this.mapH);

                let newLocation = this.getGameMapLocation(newX, newY);
                isLocationValid = (newLocation == 1);

                if (isLocationValid == false) { continue; }

                if (this.player.posX == newX && this.player.posY == newY) {
                    isLocationValid = false;
                }
            }

            enemy.posX = newX;
            enemy.posY = newY;
        })
    }
}