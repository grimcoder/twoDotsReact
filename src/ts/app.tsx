/// <reference path='../typings/tsd.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ScoreTable from './scoreTable'

import {
    Store,
    compose,
    createStore,
    bindActionCreators,
    combineReducers
} from 'redux';
import {
    connect,
    Provider
} from 'react-redux';

import { Action } from 'redux-actions';

interface HelloWorldProps {
    name: string;
    width: string;
    height: string;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

var getRandomColor = (colors:[String]):String => {
    return colors[getRandomInt(0, colors.length)];
}

var colors:[string] = ['red', 'yellow', 'brown', 'blue', 'green']

class Cell {
    className:String = 'unselected';
    color:String = getRandomColor(colors);
    x:number
    y:number

    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }
}

class Rules{
    maxTurns: number = 0
    amountToCollect : {[color: string] : number} = {}
}

class TwoDotsState {
    Rules : Rules = new Rules()
    Grid : Cell[][] = []
    startDrag : boolean = false
    turns: number = 0
    lastCell : Cell
    score : {[color: string] : number}= colors.reduce((total, color)=>{
        total[color] = 0
        return total
    }, Object())


    constructor(public width: number, public height: number) {
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

var Hello = React.createClass<HelloWorldProps, TwoDotsState>(
    {

        getInitialState: function () {
            return new TwoDotsState(Number(this.props.width), Number(this.props.height));
        },

        removeDots: function (state:TwoDotsState):void {

            var flatCells = [].concat.apply([], state.Grid);

            var selectedCells = flatCells.filter((e) => {
                return e.className == 'selected'
            })

            if (
                selectedCells.length < 2) {
                return
            }
            else {
                state.score[selectedCells[0].color] += selectedCells.length
            }

            for (var i = state.height - 1; i >= 0; i--) {

                var emptyCells = state.Grid[i].filter((e)=> {
                    return e.className == 'selected'
                });

                if (emptyCells.length == 0) continue;
                for (var x:number = 0; x < state.width; x++) {
                    if (state.Grid[i][x].className == 'selected') {
                        //shift down
                        for (var n:number = i; n > 0; n--) {
                            var cellAbove = state.Grid[n - 1][x]
                            state.Grid[n][x].color = cellAbove.color
                            state.Grid[n][x].className = cellAbove.className
                        }
                        state.Grid[0][x] = new Cell(x, 0)
                    }
                }
                i++;
            }

            state.turns++
        },

        checkResults : function (state:TwoDotsState){

            //have we lost?

            if (state.Rules.maxTurns < state.turns){
                console.log('you lost!!!')
                return
            }

            // have we won?

            if (Object.keys(state.Rules.amountToCollect).filter((key : string,i: number)=>{
                return state.Rules.amountToCollect[key] > state.score[key]
            }).length == 0) {
                console.log('you won!!!')
            }


        },

        onMouseLeave: function () {
            this.state.startDrag = false
            this.state.Grid.map((elem, i)=> {
                elem.map((cell:Cell, n)=> {
                    cell.className = 'unselected'
                })
            })
            this.setState(this.state);
        },

        handleMouseUp: function () {
            this.state.startDrag = false
            this.removeDots(this.state);
            this.setState(this.state);
            this.checkResults(this.state)
        },

        handleMouseOver: function (row, col, event) {
            var thisCell = this.state.Grid[row][col];
            if (!this.state.startDrag ||
                thisCell.color != this.state.lastCell.color ||
                Math.abs(this.state.lastCell.x - thisCell.x) +
                Math.abs(this.state.lastCell.y - thisCell.y) > 1
            ) return

            if (thisCell.className == 'selected') {
                this.state.lastCell.className = 'unselected'
            }

            this.state.lastCell = thisCell
            thisCell.className = 'selected';
            this.setState(this.state);
        },

        handleMouseDown: function (row, col) {
            this.state.startDrag = true
            this.state.lastCell = this.state.Grid[row][col]

            this.state.Grid[row][col].className = 'selected';
            this.setState(this.state);
        },

        render: function () {
            var state:TwoDotsState = this.state
            return  <div>
                <ScoreTable turns={state.turns} maxTurns={state.Rules.maxTurns} rules={state.Rules} score={state.score}/>
                <div>
                    <table className="mainGrid" onMouseLeave={this.onMouseLeave}>
                        <tbody>
                            {Array.apply(0, Array(this.state.height)).map((el, row) =>
                            <tr className="border" key={row}>

                                {Array.apply(0, Array(this.state.width)).map((el1, coll) =>
                                <td key={coll} className={this.state.Grid[row][coll].className}
                                    onMouseUp={this.handleMouseUp}
                                    onMouseOver={this.handleMouseOver.bind(null, row, coll, event)}
                                    onMouseDown={this.handleMouseDown.bind(null, row, coll)}>
                                    <div className={this.state.Grid[row][coll].color + ' cell'}></div>
                                </td>

                                    )}
                            </tr>
                                )}

                        </tbody>
                    </table>
                </div>
            </div>;
        }

    });

ReactDOM.render(
    <Hello name="World" width="5" height="5" />,
    document.getElementById('container')
);

