import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/usersActions";
import Message from "../components/Message";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AuthScreen = ({ history }) => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const userState = useSelector((state) => state.user);
  const { error } = userState;

  const [form, setForm] = useState(initialFormData);
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();

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
                  // onChange={(e) => setForm({ ...form, email: e.target.value })}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi girin"
                  // onChange={(e) =>
                  //   setForm({ ...form, password: e.target.value })
                  // }
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
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (!login) {
                  dispatch(signup(form, history));
                }
              }}
              className="align-content-center mt-3"
            >
              <h1>Kayıt Ol</h1>
              {error && <Message>{error}</Message>}
              <Form.Group style={{ display: "flex" }}>
                <Form.Control
                  className="mr-2"
                  style={{ marginRight: "2px" }}
                  type="text"
                  placeholder="İlk adınız"
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                ></Form.Control>
                <Form.Control
                  className="ml-2"
                  style={{ marginLeft: "2px" }}
                  type="text"
                  placeholder="Soy adınız"
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email adresinizi girin"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi girin"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Şifrenizi doğrulayın</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Şifrenizi doğrulayın"
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
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
