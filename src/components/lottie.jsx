import React from 'react';
import Lottie from 'lottie-react';
import animationData from './public/animation.json'; // Replace with your animation file

function MyLottieAnimation() {
    return (
      <div>
         <dotlottie-player src="https://lottie.host/cddb178f-9d3a-4d71-bc53-777a1785ec6c/2ziPhq78p9.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>
      </div>
    );
  }
  
  export default MyLottieAnimation;