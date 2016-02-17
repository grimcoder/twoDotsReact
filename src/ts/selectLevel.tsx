import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Levels} from './levels'

export class SelectLevel extends React.Component<any, any> {
    constructor(props){

        super(props)
        this.levelSelected = this.levelSelected.bind(this)

    }

    levelSelected(level) {
        this.props.levelSelected(level)
    }

    render() {

        var levels = []

        for (var i in Levels.levels){

            var x = 26 + i * 72

            levels.push(
                    <circle key={i} onClick={this.levelSelected.bind(this, i)} cx={x} cy="26" r="24" stroke="white" strokeWidth="4" fill="black" />
            )

            levels.push(
                <text onClick={this.levelSelected.bind(this, i)}  x={x} y="32" key={'text' + i} fill="white" fontFamily="Verdana"  textAnchor="middle" alignment-baseline="middle"
                      fontSize="18px" font-weight="bold">{Number(i) + 1}
                </text>)



        }

        return <div className="main">
            <img src="images/exportlevelbkg.png" />
                <div  className="backbutton"></div>
                <div className="levels">

                        <svg>
                                {levels}
                        </svg>

                </div>
        </div>
    }
}

export default SelectLevel;