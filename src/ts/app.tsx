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
            getInitialState: function () {
                return new TwoDots.TwoDotsState(Number(this.props.width), Number(this.props.height));
            },
            removeDots: function (state:TwoDots.TwoDotsState):void {
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
                            state.Grid[0][x] = new TwoDots.Cell(x, 0)
                        }
                    }
                    i++;
                }
                state.turns++
            },

            checkResults: function (state:TwoDots.TwoDotsState) {
                //have we lost?
                if (state.Rules.maxTurns < state.turns) {
                    console.log('you lost!!!')
                    return
                }
                // have we won?
                if (Object.keys(state.Rules.amountToCollect).filter((key:string, i:number)=> {
                        return state.Rules.amountToCollect[key] > state.score[key]
                    }).length == 0) {
                    console.log('you won!!!')
                }
            },

            onMouseLeave: function () {
                this.state.startDrag = false
                this.state.Grid.map((elem, i)=> {
                    elem.map((cell:TwoDots.Cell, n)=> {
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

            updateLevel: function(width,height,MaxTurns,limits){
                console.log(arguments)

                var newState = new TwoDots.TwoDotsState(Number(width), Number(height))

                newState.Rules.maxTurns = Number(MaxTurns)
                newState.Rules.amountToCollect = limits
                this.setState(newState);
            },

            render: function () {

                var state:TwoDots.TwoDotsState = this.state
                return  <div>
                    <ScoreTable turns={state.turns} maxTurns={state.Rules.maxTurns} rules={state.Rules}
                                score={state.score}/>
                    <div>
                        <table className="mainGrid" onMouseLeave={this.onMouseLeave}>
                            <tbody>
                                {Array.apply(0, Array(state.height)).map((el, row) =>
                                <tr className="border" key={row}>

                                    {Array.apply(0, Array(state.width)).map((el1, coll) =>
                                    <td key={coll} className={this.state.Grid[row][coll].className}
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

                    <LevelEditor gridState={state} rules={state.Rules} score={state.score} updateLevel={this.updateLevel} />
                </div>;
            }

        });

    ReactDOM.render(
        <Hello name="World" width="5" height="5"/>,
        document.getElementById('container')
    );

