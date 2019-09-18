import React, {Component, Fragment} from 'react';
import axios from 'axios';
export default class TestApi extends Component {
    constructor() {
        super()
        this.changeName = this.changeName.bind(this);
        this.getTopics = this.getTopics.bind(this);
        this.login = this.login.bind(this);
        this.markAl = this.markAl.bind(this);
    }
    changeName() {

    }
    getTopics() {
        axios.get('/api/topics').then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        })
    }
    login() {
        axios.post('/api/user/login', {
            accessToken: 'bfff1cde-d9c0-4d8e-a4f3-79a6d30d34dc'
        }).then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        })
    }
    markAl() {
        axios.post('/api/message/mark_all?needAccessToken=true').then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <Fragment>
                <button onClick={this.getTopics}> topics  </button>
                <button onClick={this.login}> login  </button>
                <button onClick={this.markAl}> markAll  </button>
            </Fragment>
            
        )
    }
}