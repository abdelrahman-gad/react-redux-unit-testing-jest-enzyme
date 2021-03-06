import React, { Component } from 'react';

import './app.scss';

import Header  from './component/header';
import Headline from './component/headline';
import {connect} from 'react-redux';
import {compose} from 'redux';
import SharedButton from './component/button';
import ListItem from './component/listItem';
import {fetchPosts} from './actions';


const initialState = { hideBtn:false};

class App extends Component {

  constructor(props){
    super(props);
    this.fetch =this.fetch.bind(this);
    this.state={ 
      ...initialState
    }
  }
  fetch(){
     console.log('called fetch');
     this.props.fetchPosts();    
     this.exampleMethod_updatesState();
  }
  exampleMethod_updatesState(){ 
    const {hideBtn } = this.state;
    this.setState({
      hideBtn:!hideBtn
    });
  }
  render() {
   const {posts  } = this.props;
   const {hideBtn} = this.state;
   const configButton = {
     buttonText:'Get Posts',
     emitEvent:this.fetch
   }
 
   const tempArr = [{
     fname:'abduerrahman',
     lname:'gad',
     email:'abdo@gmail.com',
     age:30,
     hired:true
   }];

    return (
      <div className="App" data-test="appComponent" >
        <Header />
        <section className="main">
          <Headline header="fetch all posts" desc="click the button to get the posts" author={tempArr} />
          {/* <Headline  /> */}
        
          {!hideBtn &&  <SharedButton  {...configButton}  /> }
          {posts.length>0 && 
                <div>
                  {
                    posts.map((post,index)=>{
                      const {title,description} = post;
                      const configPost = {title,description};
                      return (<ListItem  key={index} {...configPost} />);
                     })
                  }
                </div>     
          }
        </section>
         
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    posts:state.posts
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    fetchPosts: () => dispatch(fetchPosts)
  };
}

export default compose(connect(mapStateToProps,{fetchPosts})) (App);
