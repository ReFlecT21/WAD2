// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>

// <div className="signup-page">
//       <div className="overlap-group-wrapper">
//         <div className="overlap-group">
//           <div className="rectangle" />
//           <img className="image" alt="Image" src="pictures/Human.jpg" />
//           <img className="img" alt="Rectangle" src="" />
//           <img className="vector" alt="Vector" src="pictures/MenuMate.png" />
//           <div className="text-wrapper">MenuMate</div>
//           <img className="untitled-artwork" alt="Untitled artwork" src="untitled-artwork-2.png" />
//         </div>
//       </div>
//     </div>





//     </>
//   )
// }

// export default App


import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'; // Import the CSS file with custom styles

function AutoLayoutExample() {
  return (
    <Container>
      <Row>
        <Col className="full-width-col">1 of 2</Col>
        <Col className="full-width-col">2 of 2</Col>
      </Row>
      <Row>
        <Col className="full-width-col">1 of 3</Col>
        <Col className="full-width-col">2 of 3</Col>
        <Col className="full-width-col">3 of 3</Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;








