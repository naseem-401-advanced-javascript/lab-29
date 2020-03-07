import React from 'react';
import Loader from 'react-loader-spinner';
import { If, Then, Else } from './if';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url: '',
      method: '',
      header: {},
      body: {},
      history: {},
      loader: false,
    };
  }
    handleChange = e =>{
      let name = e.target.name;
      let value = e.target.value;
      this.setState({[name]:value});
    }
    handleHistory = e =>{
      let method = this.state.method;
      let url = this.state.url;
      let source = {method, url};
      let history = this.state.history;
      let uniq = Object.keys(this.state.history).length;
      history[uniq] = source;
      this.setState({history});
    }
    apiCaller = e =>{
      e.preventDefault();
      // console.log(this.state.url);
      this.setState({loader:true});
      fetch(this.state.url,{
        method: this.state.method,
        headers:{
          'Content-Type': 'application/json',
        },
      })
        .then(res =>{
          res = res.json()
            .then(res=>{
              let header = {'Content-Type': 'application/json'};
              let body = res;
              this.setState({ header, body });
              this.setState({loader:false});
              this.props.sendResults({header,body});
            })
            .catch(err =>{
              let body = {error: err.message};
              let header = {};
              this.setState({ header, body });
              this.props.sendResults({header,body});
            });
        });
      this.props.saveToHistory(this.state.history);
    }
    render(){
      return(
        <main>
          <section>
            <form onSubmit={this.apiCaller}>
              <section id="border">
                <input type="text" className="url" name="url" value={this.state.url} onChange={this.handleChange} placeholder="URL" />
                <div className="methods">
                  <label className="nn">
                    <input type="radio" name="method" value="get" onClick={this.handleChange} />
                    <span>GET</span>
                  </label>
                  <label className="nn">
                    <input type="radio" name="method" value="post" onClick={this.handleChange} />
                    <span>POST</span>
                  </label>
                  <label className="nn">
                    <input type="radio" name="method" value="put" onClick={this.handleChange} />
                    <span>PUT</span>
                  </label >
                  <label className="nn">
                    <input type="radio" name="method" value="delete" onClick={this.handleChange} />
                    <span>DELETE</span>
                  </label >
                  <label> <button onClick={this.handleHistory} type="submit">GO!</button> </label>
                </div>
              </section>
            </form>
            <If condition={this.state.loader}>
              <Then>
                <Loader type='ThreeDots' color='green' height={50} width={50} />
              </Then>
            </If>
          </section>
        </main>
      );
    }
}
export default Form;