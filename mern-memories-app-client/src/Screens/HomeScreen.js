import React, { useState, useEffect } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemories } from "../actions/memoryActions";
import Memory from "../components/Memory";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemories());
  }, [dispatch]);

  const memories = useSelector((state) => state.memories);

  return (
    <>
      <h1>En güncel anılar</h1>
      {!memories.length ? (
        <Spinner animation="border"></Spinner>
      ) : (
        <Row>
          {memories.map((memory) => (
            <Col
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="m-auto"
              key={memory._id}
            >
              <Memory memory={memory}></Memory>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
