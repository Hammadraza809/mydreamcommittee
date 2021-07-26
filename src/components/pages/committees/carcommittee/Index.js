import React from 'react';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import Content from './Content';

function Carcommittee(props){
    return(
        <div>
            <Header/>
            <Content props={props}/>
            <Footer/>
        </div>
    );
}
export default Carcommittee;