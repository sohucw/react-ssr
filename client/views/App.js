import React, {Component, Fragment} from 'react';
import {
    Link, Router, HashRouter, BrowserRouter
} from 'react-router-dom';
import Routes from '../config/router';

export default class App extends Component {
    componentDidMount() {
        // do some thing
    }
    render() {
        // return [
        //     <div>
        //         <Link to="/">首页</Link>
        //         <br />
        //         <Link to="/detail">详情页</Link>
        //     </div>,
        //     <Routes/>
        // ]
        return (
            <Fragment>
                <Link to="/">首页</Link>
                <br />
                <Link to="/detail">详情页</Link>
                <Routes/>
            </Fragment>
        )
    }
}