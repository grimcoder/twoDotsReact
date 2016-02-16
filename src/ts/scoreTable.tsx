/**
 * Created by taraskovtun on 1/29/16.
 */
/// <reference path='../typings/tsd.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';

class ScoreTable extends React.Component<any, any> {

    render() {
        var score = this.props.score
        var rules = this.props.rules
        var turns = this.props.turns
        var maxTurns = this.props.maxTurns

        var cells = []
        var colors = []

        Object.keys(rules.amountToCollect).map(function(key){
            //var short = key + " short"
            var key2 = key + "value"

            cells.push(<td className={'short2 ' + (score[key] >= rules.amountToCollect[key] ? 'completedColor' : '')}
                           key={key2}>{score[key] + ' / ' +
                rules.amountToCollect[key]}</td>)


            colors.push(<td key={key}>
                <svg  height="20" width="20">
                    <circle cx="10" cy="10" r="10" stroke="black" strokeWidth="0" fill={key} />
                </svg>
            </td>)
        })

        //cells.push(<td className="short3"  key='turns'> {'Turns ' + turns + ' / ' + maxTurns} </td>)

        return (<div className="score">


            <table>
                <tbody>
                <tr>
                    {cells}
                </tr>
                <tr>
                    {colors}

                </tr>
                </tbody>
            </table>

            </div>
        );
    }
}

    export default ScoreTable;
