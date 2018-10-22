import logo from '.././logo.svg';
import React, {Component} from 'react'
import '.././App.css';

class Home extends Component {

    state = {
        response: ''
      };
    /*
      componentDidMount() {
    
        this.callApi()
          .then (res=> this.setState ({response:'nothing yet'}))
          //.then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
 
      }
    
      callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
      };
*/
  render() {
    return (
        <div>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Social Media App based on MERN Skeleton</p>
          <p>
              This is the Public Home Page.
          </p>
          
          <p>
            Edit <code>src/core/Home.js</code> and save to reload me.
          </p>

        </header>
      </div>
          </div>
        
    )
  }
}


export default Home
