import React from 'react';
import Header from '../../common/Header'
import Slider from './Slider'
import Content from './Content'
import Footer from '../../common/Footer'

function Home(){
    return(
        <div>
            <Header/>
            <Slider/>
            <Content/>
            <Footer/>
        </div>
    );
}
export default Home;