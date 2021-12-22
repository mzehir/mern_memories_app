import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../actions/usersActions";
import Message from "../components/Message";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";

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

  const googleSuccess = (res) => {
    console.log(res);
    const user = res?.profileObj;
    const accessToken = res?.tokenId;
    const googleLogin = "google";

    try {
      dispatch({ type: "AUTH", payload: { user, accessToken, googleLogin } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {login ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (login) {
                  dispatch(signin(form, history));
                }
              }}
              className="align-content-center mt-3"
            >
              <h1>Giriş Yap</h1>
              {error && <Message>{error}</Message>}
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
              <Button
                style={{ width: "100%", marginTop: "10px" }}
                type="submit"
              >
                Giriş Yap
              </Button>

              <GoogleLogin
                clientId="1092476735914-t0fbtghotqpek1in1mbuuqhs7jemv95p.apps.googleusercontent.com"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                render={(renderProps) => (
                  <Button
                    style={{ width: "100%", marginTop: "10px" }}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    variant="info"
                  >
                    <FcGoogle
                      size={22}
                      className="text-center"
                      style={{ marginRight: "2px" }}
                    />
                    Google hesabınız ile giriş yapın
                  </Button>
                )}
              />

              <div style={{ display: "flex", justifyContent: "center" }}>
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
              </div>
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
