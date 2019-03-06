import React, { Component } from "react";
import Question from "./Question";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


class Dashboard extends Component {
        
  render() {

    return (
           <div className="container"> 
                <div className="row">                        
                        <div className="col-md-11">
                                <div className={"switch-item noPadding"}>  
                                        <label className="comp-switch">
                                                <input type="checkbox" onChange={this.props.onSwitchChange} />         
                                                <span id="knob" className={"slider round"}></span>
                                        </label>                                                                                    
                                </div> 
                        </div>
                        <div className="col-md-1">                                
                                <Link to='/NewQuestion'><span className="iconicstroke-document-alt-stroke"></span></Link> 
                        </div>                                                        
                </div>
                <div className="row">  
                        {this.props.questionIds.map((id, key) => (
                                <Question id={id} key={key} displayQuestion={'both'} page={this.props.page} switchChecked={this.props.switchChecked}/>
                        ))}
                </div>
            </div>
    )
  }
}

function mapStateToProps ({ autheduser, users, questions }, { switchChecked, onSwitchChange, page }) {
        const answered = switchChecked
        const user = users[autheduser]
        let answeredId = [];
              
        if (answered) {
                answeredId = Object.keys(user.answers)               
        } 
        else {
                Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp).forEach(qid => {
                        let ans = Object.keys(user.answers).filter(uid => uid === qid);

                        if (ans.length === 0) {
                                answeredId.push([qid]);
                        }                                                
                });
        }     

        return {
          questionIds: answeredId
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
          switchChecked : switchChecked, 
          onSwitchChange: onSwitchChange,
          page: page,
        }
}
      
export default connect(mapStateToProps)(Dashboard)