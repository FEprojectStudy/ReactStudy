import React from 'react'
import {withRouter} from  'react-router-dom';

function Main(props) {
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h1 style={{marginBottom:'20px'}}>리액트 웹 게임</h1>
            <div className="games" style={{display:'flex', gap:'10px'}}>
                <div className="mainBtn" onClick={()=>{props.history.push('/WordChainGame')}}>쿵쿵따</div>
                <div className="mainBtn" style={{backgroundColor:'orange'}} onClick={()=>{props.history.push('/NumberBaseballGame')}}>숫자야구</div>
                <div className="mainBtn" style={{backgroundColor:'green', color:'white'}} onClick={()=>{props.history.push('/ReactionVelocity')}}>반응속도</div>
            </div>
        </div>
    )
}

export default withRouter(Main)
