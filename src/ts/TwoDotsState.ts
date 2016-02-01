/**
 * Created by taraskovtun on 1/31/16.
 */

export module TwoDots {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var getRandomColor = (colors:[String]):String => {
        return colors[getRandomInt(0, colors.length)];
    }

    export var colors:[string] = ['red', 'yellow', 'brown', 'blue', 'green']

    export class Cell {
        className:String = 'unselected';
        color:String = getRandomColor(colors);
        x:number
        y:number

        constructor(x:number, y:number) {
            this.x = x
            this.y = y
        }
    }

    export class Rules {
        maxTurns:number = 0
        amountToCollect:{[color: string] : number} = {}
    }

    export class TwoDotsState {
        Rules:Rules = new Rules()
        Grid:Cell[][] = []
        startDrag:boolean = false
        turns:number = 0
        lastCell:Cell
        score:{[color: string] : number} = colors.reduce((total, color)=> {
            total[color] = 0
            return total
        }, Object())


        constructor(public width:number, public height:number) {
            Array.apply(0, Array(height)).map((el, row) => {
                this.Grid[row] = [];
                Array.apply(0, Array(width)).map((el1, col) => {
                    this.Grid[row][col] = new Cell(col, row);
                });
            });


            /*todo: this is a temporary rules,
             remove when ready
             */


            this.Rules.maxTurns = 10

            this.Rules.amountToCollect = {
                'red': 3,
                'yellow': 6,
                'blue': 4
            }
        }
    }
}