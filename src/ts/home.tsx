import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class Home extends React.Component<any, any> {
    render() {
        return <div className="main">
            <img src="images/Splash%20screen%20no%20buttons.png" />

                <div onClick={this.props.selectLevel} className="playbutton"></div>

                <div onClick={this.props.selectEditor}  className="editorbutton"></div>

        </div>
    }
}
export default Home;