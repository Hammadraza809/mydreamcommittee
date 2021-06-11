import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Content from './Content';

function Register(props){
    return(
        <div>
            <Header/>
            <Content props={props}/>
            <Footer/>
        </div>
    );
}
export default Register;