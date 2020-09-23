import React from 'react'
import {Card,CardImg,CardBody,CardTitle,CardText,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({ dish }){
        if(dish != null){
            return(
            <div className="col-md-5 col-12 m-1">
                <Card>
                    <CardImg top width="100%"  src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>)
            }else{
                return(
                    <div></div>
                )
            }
        }
        function RenderComments({ comments }){
            if( comments != null){
                return(
                    <ul key={comments.id} className="list-unstyled">
                          <li>{comments.comment}</li>
                          <li>{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
                    </ul>
              );
               }
               else{
                   return(
                       <div></div>
                   )
               }
        }
        function CommentHeading({ comments }){
            if(comments != null){
                return(
                    <h4>{comments.description}</h4>
                )
               }
               else{
                   return(
                       <div></div>
                   )
               }
        }
    const DishDetails = (props) => {
      
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish = {props.dish}/>
                    <div className="row">
                        <div className="col-12">
                            <RenderComments comments = {props.comments} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default DishDetails;