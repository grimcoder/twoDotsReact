/// <reference path='../typings/tsd.d.ts'/>
/// <reference path="TwoDotsState.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ScoreTable from './scoreTable'
import LevelEditor from './levelEditor'
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

import {TwoDots} from './TwoDotsState'


interface HelloWorldProps {
    name: string;
    width: string;
    height: string;
}


var Hello = React.createClass<HelloWorldProps, TwoDots.TwoDotsState>(
    {
        path: [],

        getInitialState: function () {
            return new TwoDots.TwoDotsState(Number(this.props.width), Number(this.props.height));
        },

        needsShuffling: function () {

        },

        thisArray: function () {
            return [].concat.apply([], this.state.Grid)
        },

        removeDots: function (state:TwoDots.TwoDotsState):void {

            var selectedColor = this.path[0].color

            var thisColorArray = this.thisArray().filter((cell)=> {
                return cell.color == selectedColor
            })

            if (
                this.path.length < 2) {
                return
            }

            var cellsToRemove:[TwoDots.Cell]


            if (!this.isLoop()) {
                state.score[selectedColor] += this.path.length
                cellsToRemove = this.path
            }
            else {
                cellsToRemove = thisColorArray
                state.score[selectedColor] += thisColorArray.length
            }


            for (var i = 0; i < state.height; i++) {
                if (cellsToRemove.filter((cell)=> {
                        return cell.y == i
                    }).length == 0) continue;


                for (var x:number = 0; x < state.width; x++) {
                    var cellInPath = cellsToRemove.filter((cell)=> {
                        return cell.x == x && cell.y == i
                    })

                    if (cellInPath.length > 0) {
                        cellsToRemove.splice(cellsToRemove.indexOf(cellInPath[0]), 1)
                        for (var n:number = i; n > 0; n--) {
                            var cellAbove = state.Grid[n - 1][x]
                            state.Grid[n][x] = cellAbove
                            cellAbove.y++
                        }
                        state.Grid[0][x] = new TwoDots.Cell(x, 0)
                    }
                }
            }

            state.turns++
        },


        checkResults: function (state:TwoDots.TwoDotsState) {
            //have we lost?
            if (state.Rules.maxTurns < state.turns) {
                this.state.mode = 'message'
                this.state.message = 'You lost!!!'
                this.setState(this.state)

                return
            }
            // have we won?
            if (Object.keys(state.Rules.amountToCollect).filter((key:string, i:number) => {
                    return state.Rules.amountToCollect[key] > state.score[key]
                }).length == 0) {
                this.state.mode = 'message'
                this.state.message = 'You won!!!'
                this.setState(this.state)
            }
        },

        onMouseLeave: function () {
            this.state.startDrag = false
            this.path = []
            this.setState(this.state);
        },

        handleMouseUp: function () {
            this.state.startDrag = false
            this.removeDots(this.state);
            this.path = []
            this.setState(this.state);
            this.checkResults(this.state)
        },

        handleMouseOver: function (row, col) {

            if (!this.path || this.path.length == 0) {
                return
            }

            var lastCell = this.path[this.path.length - 1]
            var thisCell = this.state.Grid[row][col];

            if (thisCell.color != lastCell.color ||
                Math.abs(lastCell.x - thisCell.x) +
                Math.abs(lastCell.y - thisCell.y) > 1
            ) return

            if (this.state.Grid[row][col] == this.path[this.path.length - 2]) {
                this.path.pop()
            }

            if (this.path[this.path.length - 1] != this.state.Grid[row][col]) {
                this.path.push(this.state.Grid[row][col])
            }

            this.setState(this.state);
        },

        isLoop: function () {
            var isLoop = false

            var lastInPath = this.path[this.path.length - 1]

            if (this.path.filter((cell)=> {
                    return cell.x == lastInPath.x && cell.y == lastInPath.y
                }).length > 1) {
                isLoop = true
            }
            return isLoop
        },

        handleMouseDown: function (row, col) {

            this.path.push(this.state.Grid[row][col])
            this.setState(this.state);
        },
        ShowLevelEditor: function () {
            this.state.mode = 'editor'
            this.setState(this.state);
        },
        ShowBoard: function () {
            this.state.mode = 'board'
            this.setState(this.state);
        },
        updateLevel: function (width, height, MaxTurns, limits) {

            var newState : TwoDots.TwoDotsState = new TwoDots.TwoDotsState(Number(width), Number(height))
            newState.Rules.maxTurns = Number(MaxTurns)
            newState.Rules.amountToCollect = limits
            newState.mode = 'board'
            this.setState(newState);
        },
        startNew: function(){
            var newState : TwoDots.TwoDotsState = new TwoDots.TwoDotsState()
            newState.mode = 'board'
            this.setState(newState);
        },

        render: function () {
            var isLoop = this.isLoop()
            var lastColor = this.path.length > 0 ? this.path[this.path.length - 1].color : undefined

            var state:TwoDots.TwoDotsState = this.state

            var body
            if (this.state.mode == 'editor') {
                body =<div>
                    <button onClick={this.ShowBoard} className="btn btn-info">Show board</button>
                    <LevelEditor gridState={state} rules={state.Rules} score={state.score}
                                 updateLevel={this.updateLevel}/>
                </div>
            }
            else if (this.state.mode == 'board') {
                body =<div>
                    <button onClick={this.ShowLevelEditor} className="btn btn-info">Level editor</button>
                    <ScoreTable turns={state.turns} maxTurns={state.Rules.maxTurns} rules={state.Rules}
                                score={state.score}/>

                    <table className="mainGrid" onMouseLeave={this.onMouseLeave}>
                        <tbody>
                            {Array.apply(0, Array(state.height)).map((el, row) =>
                            <tr className="border" key={row}>

                                {Array.apply(0, Array(state.width)).map((el1, coll) =>
                                <td key={coll} className={this.path.filter((cell)=>{return (cell.x == coll && cell.y == row)
                                    || (isLoop && state.Grid[row][coll].color == lastColor)}).length == 0
                                    ? 'unselected' : 'selected'}

                                    onMouseUp={this.handleMouseUp}
                                    onMouseOver={this.handleMouseOver.bind(null, row, coll, event)}
                                    onMouseDown={this.handleMouseDown.bind(null, row, coll)}>

                                    <div className={state.Grid[row][coll].color + ' cell'}></div>
                                </td>

                                    )}
                            </tr>
                                )}
                        </tbody>
                    </table>
                </div>

            }

            else if  (this.state.mode == 'message'){
                body =<section>
                    <h1>{this.state.message}</h1>
                    <button className="btn btn-danger" onClick={this.startNew}>Start new</button>
                </section>
            }
            return  <div>

                {body}

            </div>;
        }

    });

ReactDOM.render(
    <Hello name="World" width="10" height="8"/>,
    document.getElementById('container')
);

