import React, { Component } from 'react';
import Menu from './MenuComponents'
import '../App.css';
import Header from './Header';
import {Switch , Route , Redirect , withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import  DishDetails   from './DishDetailsComponent';
import About from './AboutComponent';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component{

    
    constructor(props) {
        super(props);
    }

      render() {
        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
            )
        }

        const DishWithId = ({ match }) =>{
            return(
                <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))[0]} 
                />
            );
        }

        return (
          <div>
            <Header/>
            <Switch>
                <Route path='/home' component={HomePage}></Route>
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId}></Route>
                <Route exact path='/contact' component={Contact}/>
                <Route excat path='/about' component={() => <About leaders={this.props.leaders}/>}></Route>
                <Redirect to='/home'></Redirect>
            </Switch>
          </div>
        );
      }
    }
    
    export default withRouter(connect(mapStateToProps)(Main));