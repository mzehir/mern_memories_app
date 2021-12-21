import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { deleteMemory } from "../actions/memoryActions";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdDelete, MdModeEdit } from "react-icons/md";

const Memory = ({ memory }) => {
  const [user, setuser] = useState();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setuser(userData);
  }, [userState]);

  return (
    <Card className="rounded py-3 my-3">
      <Card.Img variant="top" src={memory.image} />
      <Card.Body>
        <Card.Title style={{ color: "darkblue" }}>{memory.title} </Card.Title>
        <Card.Text>{memory.content}</Card.Text>
        <Card.Title>
          <span style={{ color: "darkblue" }}>Yazar: </span>
          {memory.creator}
        </Card.Title>
        <Card.Subtitle variant="primary">
          {moment(memory.createdAt).fromNow}
        </Card.Subtitle>
      </Card.Body>
      {user?.user?._id === memory.creatorId ? (
        <Card.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
          className="bg-white pb-0"
        >
          <LinkContainer
            to={`/update/${memory._id}`}
            style={{ cursor: "pointer" }}
          >
            <MdModeEdit size={25} color="blue"></MdModeEdit>
          </LinkContainer>
          <MdDelete
            size={25}
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(deleteMemory(memory._id));
            }}
          ></MdDelete>
        </Card.Footer>
      ) : null}
    </Card>
  );
};

export default Memory;
