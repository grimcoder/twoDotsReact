import * as React from 'react';
import * as ReactDOM from 'react-dom';


export class SelectLevel extends React.Component<any, any> {
    render() {
        return <div className="main">
            <img src="images/exportlevelbkg.png" />
                <div  className="backbutton"></div>
                <div className="levels">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <div  className="level" dangerouslySetInnerHTML={{__html: '<svg><circle cx="26" cy="26" r="24" stroke="white" stroke-width="4" fill="transparent"/><text x="26" y="26" fill="white" font-family="Verdana"  text-anchor="middle" alignment-baseline="middle" font-size="18px" font-weight="bold">1</text></svg>'}}>

                                </div>
                            </td>

                        </tr></tbody>
                    </table>
                </div>
        </div>
    }
}

export default SelectLevel;