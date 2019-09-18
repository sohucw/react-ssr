
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopicList from '../views/topic-list';
import TopicDetail from '../views/topc_detail';
import TestApi from '../views/test/api-test';
export default () => [
  <Route path="/" key="/"  render={() => <Redirect to="/list"/> } exact/>,
  <Route path="/list" key="list" component={TopicList}/>,
  <Route path="/detail"  key="detail" component={TopicDetail}/>,
  <Route path="/test"  key="test" component={TestApi}/>
]
