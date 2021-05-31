import React from 'react';
import Content from './Content.js'

function Dashboard(props){
    console.log(props)
    return(
        <div>
            <Content props={props.history}/>
        </div>
    )
}
export default Dashboard;