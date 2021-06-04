import React from 'react';
import Content from './Content'

function Login(props){
    return(
        <div>
            <Content props={props.history}/>
        </div>
    );
}
export default Login;