import React, { Component } from 'react';
import Menu from './MenuComponents'
import '../App.css';
import Header from './Header';
import {Switch , Route , Redirect , withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import  DishDetails   from './DishDetailsComponent';
import About from './AboutComponent';
import {connect} from 'react-redux';
import { addComment , fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../Redux/ActionsCreators';
import { actions } from 'react-redux-form';
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
 const mapDispatchToProps = dispatch => ({
   addComment : (dishId , rating , author , comment) => dispatch(addComment(dishId,rating,author,comment)),
   fetchDishes: () => { dispatch(fetchDishes())},
   resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
   fetchComments: () => { dispatch(fetchComments())},
   fetchPromos: () => { dispatch(fetchPromos())},
   fetchLeaders:() => {dispatch(fetchLeaders())}
 })
 
class Main extends Component{

    
    constructor(props) {
        super(props);
    }
    componentDidMount(){
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
    }
      render() {
        const HomePage = () => {
          return(
              <Home 
                  dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                  dishesLoading={this.props.dishes.isLoading}
                  dishesErrM  ess={this.props.dishes.errMess}
                  promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                  promotionsLoading = {this.props.promotions.isLoading}
                  promotionsErrM ess= {this.props.promotions.errMess}
                  leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                  leadersLoading={this.props.leaders.isLoading}
                  leadersErrM ess={this.props.leaders.errMess}
              />
          );
        }
    
        const DishWithId = ({match}) => {
          console.log(this.props.comments);
          return(
            <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            addComment={this.props.addComment}
          />
          );
        };

        return (
          <div>
            <Header/>
            <Switch>
                <Route path='/home' component={HomePage}></Route>
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId}></Route>
        <Route exact path='/contact' component={() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/>}/>
                <Route excat path='/about' component={() => <About leaders={this.props.leaders}/>}></Route>
                <Redirect to='/home'></Redirect>
            </Switch>
          </div>
        );
      }
    }
    
    export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));