import React, { useEffect } from 'react' 
import './Hero.css'
import herovideo from './HeroVideo.mp4'
const Hero = () => {
 
  useEffect(()=>{
    document.getElementById('vid').play();
  },[])
    
  return (
    <div style={{backgroundColor:"#141414","position":"relative"}}>
    <header className='hero-header'>
      <h2 class="logo">MOVIX</h2>
      
    </header>
    <video id='vid' className='hero-video' src={herovideo} loop autoplay={true} muted></video>
    <div className='hero-text-content'>
    <h1 className='hero-title'>Oppenheimer</h1>
    <p className='hero-description'>During the height of the Second World War, theoretical physicist J. Robert Oppenheimer (Cillian Murphy) is recruited by the United States government to oversee the "Manhattan Project", a top secret operation intended to develop the world's first nuclear weapons. </p>
    </div>
    
    </div>
  )
}

export default Hero
