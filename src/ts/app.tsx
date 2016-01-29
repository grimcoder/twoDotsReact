/// <reference path='../typings/tsd.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';


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

class  Cell {
    className: String = 'unselected';
}

class Size{
    public static Width: number = 10
    public static Height: number = 5
}

var Grid: Cell[][] = [];

Array.apply(0, Array(Size.Height)).map((el, row) =>
{
    Grid[row] = [];
        Array.apply(0, Array(Size.Width)).map((el1, col) =>
        {
            var cell = new Cell();
            Grid[row][col] = new Cell();
        });
});


var Hello = React.createClass<HelloWorldProps, any>(
    {
        startDrag: false,

        getInitialState: function() {
            return {
                Grid: Grid
            }
        },

        onMouseLeave: function(){
            this.startDrag = false
            Grid.map((elem, i)=>{
                elem.map((cell: Cell, n)=>{
                    cell.className = 'unselected'
                })
            })
            this.setState({
                Grid: Grid
            });
        },
        handleMouseUp: function(){
            this.startDrag = false

            Grid.map((elem, i)=>{
                elem.map((cell: Cell, n)=>{
                    cell.className = 'unselected'
                })
            })
            this.setState({
                Grid: Grid
            });

        },

        handleMouseOver: function(row, col, event){
            if (!this.startDrag) return
            Grid[row][col].className = 'selected';
            this.setState({
                Grid: Grid
            });
            console.log('handleMouseOver')
        },

        handleMouseDown: function(row, col){
            this.startDrag = true
            Grid[row][col].className = 'selected';
            this.setState({
                Grid: Grid
            });
        },

        render:  function(){

            return <table onMouseLeave={this.onMouseLeave}>
                <tbody>
                    {Array.apply(0, Array(Size.Height)).map((el, row) =>
                    <tr key={row}>

                        {Array.apply(0, Array(Size.Width)).map((el1, coll) =>

                            <td key={coll} className={this.state.Grid[row][coll].className}

                                onMouseUp={this.handleMouseUp} onMouseOver={this.handleMouseOver.bind(null, row, coll, event)}

                                onMouseDown={this.handleMouseDown.bind(null, row, coll)}></td>

                            )}
                    </tr>

                        )}

                </tbody>
            </table>;
        }

    });

ReactDOM.render(
    <Hello name="World" width="5" height="5"/>,
    document.getElementById('container')
);

