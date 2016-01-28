/// <reference path='../typings/tsd.d.ts'/>


import * as React from 'react';
import * as ReactDOM from 'react-dom';


import {
    Store,
    compose,
    createStore,
    bindActionCreators,
    combineReducers
} from 'redux';
import {
    connect,
    Provider
} from 'react-redux';
import { Action } from 'redux-actions';

interface HelloWorldProps {
  name: string;
}

var Hello = React.createClass<HelloWorldProps, any>({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('container')
);

