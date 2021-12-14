import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { FcEditImage } from "react-icons/fc";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout } from "../actions/usersActions";
import decode from "jwt-decode";
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState();

  const exit = async (id) => {
    await dispatch(logout(id));
    setUser(null);
    history.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    const accessToken = user?.accessToken;
    if (accessToken) {
      const decodeAccessToken = decode(accessToken);
      if (decodeAccessToken.exp * 1000 < new Date().getTime()) {
        console.log("Token süresi doldu...");
        exit(user.user._id);
      }
    }
  }, [location, user]);

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Anı Kutusu</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            {user ? (
              <>
                <LinkContainer to="/create">
                  <Nav.Link>
                    <Button variant="outline-info">
                      <FcEditImage className="mr-2" size={20} /> Bir anı paylaş
                    </Button>
                  </Nav.Link>
                </LinkContainer>

                <Nav.Link>
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      exit(user.user._id);
                    }}
                  >
                    <RiLogoutCircleLine className="mr-2" size={20} /> Çıkış Yap
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <LinkContainer to="/auth">
                <Nav.Link>
                  <Button variant="outline-light">
                    <AiOutlineLogin className="mr-2" size={20} /> Giriş Yap
                  </Button>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
