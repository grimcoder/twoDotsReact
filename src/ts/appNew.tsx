/// <reference path='../typings/tsd.d.ts'/>
/// <reference path="TwoDotsState.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ScoreTable from './scoreTable'
import TurnsLeft from './turnsLeft'
import LevelEditor from './levelEditor'
import {Levels} from './levels'
import  {Home} from './home'

import  {SelectLevel} from './selectLevel'

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
            var state = new TwoDots.TwoDotsState()
            state.mode = 'home'
            return state;
        },

        needsShuffling: function () {
            var thisFlatArray:[TwoDots.Cell] = this.thisArray();

            for (var cell in thisFlatArray) {
                if (thisFlatArray.filter((c)=> {
                        return !(c.x == thisFlatArray[cell].x && c.y == thisFlatArray[cell].y)
                            && (Math.abs(c.x - thisFlatArray[cell].x) + Math.abs(c.y - thisFlatArray[cell].y) < 2)
                            && thisFlatArray[cell].color == c.color
                    }).length > 0) {

                    console.log('does not need shuffling')
                    this.state.mode = 'board'
                    return false
                }
            }
            console.log('needs shuffling')
            this.state.mode = 'board needsShuffling'
            this.setState(this.state)
            return true

        },


        shuffleBoard(){
            var thisFlatArray:[TwoDots.Cell] = TwoDots.shuffleArray(this.thisArray());
            for (var x = 0; x < this.state.width; x++) {
                for (var y = 0; y < this.state.height; y++) {
                    this.state.Grid[y][x] = thisFlatArray.pop();
                    this.state.Grid[y][x].x = x
                    this.state.Grid[y][x].y = y
                }
            }
            this.setState(this.state)

            this.needsShuffling()
        },

        thisArray: function ():[TwoDots.Cell] {
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
                this.state.mode = 'board message'
                this.state.message = 'You lost!!!'
                this.setState(this.state)

                return
            }
            // have we won?
            if (Object.keys(state.Rules.amountToCollect).filter((key:string, i:number) => {
                    return state.Rules.amountToCollect[key] > state.score[key]
                }).length == 0) {
                this.state.mode = 'board message'
                this.state.message = 'You won!!!'
                this.setState(this.state)
            }
        },

        onMouseLeave: function () {
            this.path = []
            this.setState(this.state);
        },

        handleMouseUp: function () {
            this.removeDots(this.state);
            this.needsShuffling()
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

        updateLevel: function (newState:TwoDots.TwoDotsState) {

            newState.mode = 'board'
            this.setState(newState);

        },

        startNew: function () {
            var newState:TwoDots.TwoDotsState = new TwoDots.TwoDotsState(Number(this.state.width), Number(this.state.height))
            newState.mode = 'board'
            this.setState(newState);
        },

        selectLevel: function () {
            this.state.mode = 'selectLevel'
            this.setState(this.state);
        },


        levelSelected: function (level) {
            this.state = Levels.levels[level]
            this.state.mode = 'board'
            this.setState(this.state);
        },


        render: function () {
            var isLoop = this.isLoop()
            var lastColor = this.path.length > 0 ? this.path[this.path.length - 1].color : undefined

            var state:TwoDots.TwoDotsState = this.state

            var message
            var body
            if (this.state.mode.indexOf('message') > -1) {
                message =<section>
                    <h1>{this.state.message}</h1>
                    <button className="btn btn-danger center" onClick={this.startNew}>Start new</button>
                </section>
            }

            if (this.state.mode.indexOf('needsShuffling') > -1) {
                message =<section>
                    <h1>Needs shuffling</h1>
                    <button className="btn btn-danger center" onClick={this.shuffleBoard}>Shuffle</button>
                </section>
            }

            if (this.state.mode.indexOf('editor') > -1) {
                body =<div>
                    <button onClick={this.ShowBoard} className="btn btn-info">Show board</button>
                    <LevelEditor gridState={state}
                                 updateLevel={this.updateLevel}/>
                </div>
            }

            if (this.state.mode.indexOf('board') > -1) {

                var circles = []
                    Array.apply(0, Array(state.height)).map((el, row) =>{
                        Array.apply(0, Array(state.width)).map((el1, coll) => {

                            circles.push(<circle  cx={10 + coll * 40} cy={10 + row * 40} r="10"
                                            strokeWidth="0"
                                            fill={state.Grid[row][coll].color} />)

                        })}
                    )

                body =
                    <div className="main">
                        <img src="images/Playground%20bkg.png"/>
                        <div className="backbutton"></div>
                        <div>

                            <ScoreTable turns={state.turns} maxTurns={state.Rules.maxTurns} rules={state.Rules}
                                        score={state.score}/>

                            <div className="grid">
                                <svg height="400" width="60">

                                    {circles}

                                </svg>
                            </div>

                            {message}
                        </div>
                        <TurnsLeft turns={state.turns} maxTurns={state.Rules.maxTurns} rules={state.Rules}
                                   score={state.score}/>
                    </div>
            }


            if (this.state.mode.indexOf('selectLevel') > -1) {
                body = <SelectLevel levelSelected={this.levelSelected}/>
            }

            if (this.state.mode.indexOf('home') > -1) {
                body = <Home selectLevel={this.selectLevel} selectEditor={this.ShowLevelEditor}/>
            }
            return body

        }

    });

ReactDOM.render(
    <Hello name="World" width="3" height="3"/>,
    document.getElementById('container')
);

