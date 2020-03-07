import  React from 'react';

import Header from './components/header.js';
import Form from './components/form.js';
import History from './components/history.js';
import Results from './components/results.js';
import './app.scss';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
    saveToHistory = history =>{
      this.setState({history});
    }
    handleResults = state =>{
      this.setState(state);
    }
    render(){
      return(
        <>
          <Header/>
          <div className ='body'>
            <Form saveToHistory ={this.saveToHistory} sendResults = {this.handleResults}/>
            <Results results={this.state}/>
            <History info ={this.state.history}/>
          </div>
        </>

      );
    }
}

export default App;