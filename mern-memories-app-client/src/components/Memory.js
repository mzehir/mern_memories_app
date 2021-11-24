import React from "react";
import moment from "moment";
import { deleteMemory } from "../axios";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdDelete, MdModeEdit } from "react-icons/md";

const Memory = ({ memory }) => {
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
            deleteMemory(memory._id);
          }}
        ></MdDelete>
      </Card.Footer>
    </Card>
  );
};

export default Memory;
