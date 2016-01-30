/**
 * Created by taraskovtun on 1/29/16.
 */
/// <reference path='../typings/tsd.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';


class ScoreTable extends React.Component<any, any> {

    render() {

        var score = this.props.score

        return (
                <div>
                {Object.keys(score).map(function(key){
                    return <div key={key}>
                        {key}:{score[key]}
                    </div>;
                    })}
</div>
        );
    }
}

    export default ScoreTable;
