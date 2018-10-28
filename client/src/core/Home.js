import React, {Component} from 'react'
import logo from '.././logo.svg';
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import Newsfeed from './../post/Newsfeed'
import "./Home.css"
import '.././App.css';

class Home extends Component {
  state = {
    defaultPage: true
  }
  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
    }else{
      this.setState({defaultPage: true})
    }
  }
  componentWillReceiveProps = () => {
    this.init()
  }
  componentDidMount = () => {
    this.init()
  }
  render() {

    return (
      <div className="">
        {this.state.defaultPage &&
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
        }
        {!this.state.defaultPage &&
         <div className="Home">
          <Newsfeed/>
         
         
          <FindPeople/>
              </div>
                 }
      </div>
    )
  }
}



export default Home
