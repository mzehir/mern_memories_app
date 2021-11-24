import React from "react";
import { Container } from "react-bootstrap";
import UpdateMemory from "../components/UpdateMemory";

import { useParams } from "react-router";

const UpdateScreen = () => {
  const { id } = useParams();
  return (
    <Container>
      <UpdateMemory id={id}></UpdateMemory>
    </Container>
  );
};

export default UpdateScreen;
