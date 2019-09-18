import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

@inject('appState')
@observer
export default class TopicList extends Component {
    constructor() {
        super()
        this.changeName = this.changeName.bind(this)
    }
    asyncBootstrap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.props.appState.count = 3;
                resolve(true);
            })
        })
    }
    componentDidMount() {

    }
    changeName(e) {
        this.props.appState.changeName(e.target.value);
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.changeName}></input>
                {this.props.appState.msg}
                this is topic list
            </div>
        )
    }
}