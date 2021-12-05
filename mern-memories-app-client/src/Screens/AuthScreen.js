import React, { useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AuthScreen = () => {
  const [login, setLogin] = useState(true);
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {login ? (
            <Form className="align-content-center mt-3">
              <h1>Giriş Yap</h1>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email adresinizi girin"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi girin"
                ></Form.Control>
              </Form.Group>
              <Button
                style={{ width: "100%", marginTop: "10px" }}
                type="submit"
              >
                Giriş Yap
              </Button>

              <Form.Text as="large" className="text-center mt-2">
                Henüz bir hesabın yok mu?{" "}
                <span
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => {
                    setLogin(!login);
                  }}
                >
                  Hesap Oluştur
                </span>
              </Form.Text>
            </Form>
          ) : (
            <Form className="align-content-center mt-3">
              <h1>Kayıt Ol</h1>
              <Form.Group style={{ display: "flex" }}>
                <Form.Control
                  className="mr-2"
                  style={{ marginRight: "2px" }}
                  type="text"
                  placeholder="İlk adınız"
                ></Form.Control>
                <Form.Control
                  className="ml-2"
                  style={{ marginLeft: "2px" }}
                  type="text"
                  placeholder="Soy adınız"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email adresinizi girin"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi girin"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Şifrenizi doğrulayın</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi doğrulayın"
                ></Form.Control>
              </Form.Group>
              <Button
                style={{ width: "100%", marginTop: "10px" }}
                type="submit"
              >
                Kayıt Ol
              </Button>
              <Form.Text
                as="large"
                className="text-center mt-2"
                style={{ marginTop: "2px" }}
              >
                Zaten bir hesabınız var mı?{" "}
                <span
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => {
                    setLogin(!login);
                  }}
                >
                  Giriş Yap
                </span>
              </Form.Text>{" "}
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthScreen;
