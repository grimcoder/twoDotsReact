import * as React from 'react';
import * as ReactDOM from 'react-dom';


export class SelectLevel extends React.Component<any, any> {
    constructor(props){

        super(props)
        this.levelSelected = this.levelSelected.bind(this)

    }

    levelSelected(level) {
        this.props.levelSelected(level)
    }

    render() {
        return <div className="main">
            <img src="images/exportlevelbkg.png" />
                <div  className="backbutton"></div>
                <div className="levels">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <div onClick={this.levelSelected.bind(this, 0)} className="level">
                                    <svg>
                                        <circle cx="26" cy="26" r="24" stroke="white" strokeWidth="4" fill="transparent"/>
                                        <text x="26" y="32" fill="white" fontFamily="Verdana"  textAnchor="middle" alignment-baseline="middle"
                                              fontSize="18px" font-weight="bold">1
                                        </text>
                                    </svg>
                                </div>
                            </td>

                        </tr></tbody>
                    </table>
                </div>
        </div>
    }
}

export default SelectLevel;