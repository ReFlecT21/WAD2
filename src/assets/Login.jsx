import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const styles = {
  body: {
    height: '100%',
    margin: 0,
    overflow: 'hidden',
    backgroundColor: '#1f5e4b',
  },
  img1: {
    width: '50%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  btncol: {
    backgroundColor: '#f6fefc',
  },
  whitetext: {
    color: '#f6fefc',
  },
  roundcorners: {
    borderRadius: '15px',
  },
};

function MyComponent() {
  return (
    <div style={styles.body}>
      {/* Left Image */}
      <img src="pictures/Human.jpg" alt="Left Image" style={styles.img1} />

      <Container>
        <Row>
          {/* segment out half the page */}
          <Col md={7}></Col>

          {/* split the page into almost half */}
          <Col md={4}>
            {/* put image with upper padding */}
            <Row className="pb-3">
              <img src="pictures/MenuMate.png" className="w-25 m-auto pt-5" alt="" />
            </Row>

            {/* put another row to cater for all form inputs */}
            <Row>
              <Container>
                {/* First Row */}
                <Row>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      className="form-control-lg"
                      style={styles.roundcorners}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      className="form-control-lg"
                      style={styles.roundcorners}
                    />
                  </Col>
                </Row>

                {/* Second Row */}
                <Row className="mt-3">
                  <Col md={1}></Col>
                  <Col md={10}>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      className="form-control-lg"
                      style={styles.roundcorners}
                    />
                  </Col>
                  <Col md={1}></Col>
                </Row>

                {/* Third Row */}
                <Row className="mt-3">
                  <Col md={0}></Col>
                  <Col md={12}>
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      className="form-control-lg"
                      style={styles.roundcorners}
                    />
                  </Col>
                  <Col md={0}></Col>
                </Row>

                {/* Submit button */}
                <Row className="mt-4">
                  <Col>
                    <Button
                      type="button"
                      className="btn-lg"
                      style={{ ...styles.btncol, ...styles.roundcorners }}
                    >
                      Start your journey!
                    </Button>
                  </Col>
                </Row>

                {/* Login suggestion */}
                <Row className="mt-3">
                  <Col>
                    <div style={styles.whitetext}>
                      Already have an account? <a href="#">Log in</a>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Col>

          {/* split page into 3 with this added column to add some space at the back */}
          <Col md={1}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyComponent;
