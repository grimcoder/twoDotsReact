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

        var rules : TwoDots.Rules = this.props.rules
        var state = this.props.gridState;
        var amountToCollect = rules.amountToCollect

        this.changed = this.changed.bind(this)
        this.update = this.update.bind(this)
        this.changedcolorRules = this.changedcolorRules.bind(this)

        this.state = {
            amountToCollect : amountToCollect,
            width:state.width,
            height: state.height,
            MaxTurns: rules.maxTurns}
    }

    changedcolorRules(){
        var limits = {}

        var colorLimit = this.refs['colorRules'].value

        TwoDots.colors.slice(0,Number(colorLimit)).map((color)=>{
            limits[color] = 5
        })



        this.setState({amountToCollect: limits})
    }

    changed(){


        var width = (this.refs['width']).value;
        var height = this.refs['height'].value;
        var MaxTurns = this.refs['MaxTurns'].value;
        var limits = {}
        for(var color in this.state.amountToCollect){
            limits[color] = this.refs[color].value
        }

        this.setState({
            width:width,
            height: height,
            MaxTurns: MaxTurns,
            amountToCollect: limits
       })
    }


    update(){
        var width = (this.refs['width']).value;
        var height = this.refs['height'].value;
        var MaxTurns = this.refs['MaxTurns'].value;
        var limits = {}
        for(var color in this.state.amountToCollect){
            limits[color] = this.refs[color].value
        }
        var updateLevel = this.props.updateLevel;

        updateLevel(width,height,MaxTurns,limits)
    }

    render() {

        var colorRules   = Object.keys(this.state.amountToCollect).length.toString()

        var limits = this.state.amountToCollect
        var width  = this.state.width
        var height  = this.state.height
        var MaxTurns  = this.state.MaxTurns

        var selectedColors = Object.keys(limits)

        var colorRows = []

        for (var c in selectedColors){
            colorRows.push(<tr key={selectedColors[c]}><td className='short'><div className={selectedColors[c] + ' cell'}></div></td><td  className="short2" >
                <input  className="short2"  onChange={this.changed}  type="text" ref={selectedColors[c]} value={limits[selectedColors[c]]} /> </td></tr>)
        }

        return <div className="levelEditor">
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
                <button onClick={this.update} className="btn">Update</button>
        </div>
    }
}

export  default LevelEditor