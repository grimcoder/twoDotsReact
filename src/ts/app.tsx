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

var size:[number] = [5, 5]
var Hello = React.createClass<HelloWorldProps, any>(
    {
        handleMouseDown: function(row, coll){
            console.log('row: ' + row)
            console.log('coll: ' + coll)
        },
        render: function () {

            return <table>

                <tbody>

                    {Array.apply(0, Array(5)).map((el, row) =>
                    <tr key={row}>

                        {Array.apply(0, Array(5)).map((el1, coll) =>
                            <td key={coll}  onMouseDown={this.handleMouseDown.bind(null, row, coll)}></td>
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

