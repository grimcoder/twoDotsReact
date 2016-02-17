/// <reference path='../typings/tsd.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TwoDots} from './TwoDotsState'

export class LevelEditor extends React.Component<any, any> {

    refs: {
        [key: string]: (HTMLInputElement);
    }

    constructor(props){
        super(props)

        var state = this.props.gridState;


        this.changed = this.changed.bind(this)
        this.update = this.update.bind(this)
        this.changedcolorRules = this.changedcolorRules.bind(this)
        this.changeColor = this.changeColor.bind(this)

        this.state = state
    }

    changedcolorRules(){

        var colorLimit = this.refs['colorRules'].value
        this.state.Rules.amountToCollect = {};
        TwoDots.colors.slice(0,Number(colorLimit)).map((color)=>{
            this.state.Rules.amountToCollect[color] = 5
        })

        this.setState(this.state)
    }

    changed(){

        var width = (this.refs['width']).value;
        var height = this.refs['height'].value;
        var MaxTurns = this.refs['MaxTurns'].value;

        var newState:TwoDots.TwoDotsState = new TwoDots.TwoDotsState(Number(width), Number(height))

        newState.Rules.maxTurns = Number(MaxTurns)
        for(var color in this.state.Rules.amountToCollect){
            newState.Rules.amountToCollect[color] = Number(this.refs[color].value)
        }

        this.setState(newState)
    }

    changeColor(row, coll){
        var nextColor =  (TwoDots.colors.indexOf(this.state.Grid[row][coll].color) + 1 )  % TwoDots.colors.length
        this.state.Grid[row][coll].color = TwoDots.colors[nextColor]
        this.setState(this.state)
    }

    update(){

        var updateLevel = this.props.updateLevel;
        updateLevel(this.state)
    }

    render() {

        var colorRules   = Object.keys(this.state.Rules.amountToCollect).length.toString()

        var limits = this.state.Rules.amountToCollect
        var width  = this.state.width
        var height  = this.state.height
        var MaxTurns  = this.state.Rules.maxTurns

        var selectedColors = Object.keys(limits)

        var colorRows = []

        for (var c in selectedColors){
            colorRows.push(<tr key={selectedColors[c]}><td className='short'><div className={selectedColors[c] + ' cell'}></div></td><td  className="short2" >
                <input  className="short2"  onChange={this.changed}  type="text" ref={selectedColors[c]} value={limits[selectedColors[c]]} /> </td></tr>)
        }
        var body
        var state = this.state
        body =<div>


            <table className="mainGrid">
                <tbody>
                    {Array.apply(0, Array(state.height)).map((el, row) =>
                    <tr className="border" key={row}>

                        {Array.apply(0, Array(state.width)).map((el1, coll) =>
                        <td key={coll} className='unselected' onClick={this.changeColor.bind(null, row, coll)}>

                            <div className={state.Grid[row][coll].color + ' cell'}></div>
                        </td>
                            )}
                    </tr>
                        )}
                </tbody>
            </table>

        </div>

        return <div>
            <div className="h4">Level editor</div>

            <div>

                Width:
                <input type="text" className="short" ref="width"  onChange={this.changed} value={width} />
                Height:
                <input type="text" className="short" ref="height"  onChange={this.changed} value={height} />
                Max turns:
                <input type="text" className="short" ref="MaxTurns"  onChange={this.changed} value={MaxTurns} />
                <br/>
                How many colors:
                <input type="text" className="short2" ref="colorRules" onChange={this.changedcolorRules} value={colorRules} />

            </div>

            <table>
                <tbody>
                    {colorRows}
                </tbody>
            </table>
            <br/>
                {body}
                <button onClick={this.update} className="btn">Update</button>
        </div>
    }
}

export  default LevelEditor