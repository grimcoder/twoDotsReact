/**
 * Created by taraskovtun on 1/29/16.
 */
/// <reference path='../typings/tsd.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';

class TurnsLeft extends React.Component<any, any> {

    render() {

        var turns = this.props.turns
        var maxTurns = this.props.maxTurns


        return (<div className="turns">{'Turns ' + turns + ' / ' + maxTurns}</div>);
    }
}

    export default TurnsLeft;
