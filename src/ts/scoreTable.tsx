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

        Object.keys(rules.amountToCollect).map(function(key){
            //var short = key + " short"
            var key2 = key + "value"
            cells.push(<td className="short" key={key}><div className={key + ' cell'} ></div></td>  )
            cells.push(<td className="short2"  key={key2}>{score[key] + ' of ' + rules.amountToCollect[key]}</td>)
        })

        cells.push(<td className="short3"  key='turns'> {'Turns ' + turns + ' of ' + maxTurns} </td>)

        return (
                <table className="scoreTable"><tbody><tr>
                {cells}
                </tr></tbody></table>
        );
    }
}

    export default ScoreTable;
