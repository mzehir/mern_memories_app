import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../axios/index.js";
import ReactFileBase64 from "react-file-base64";
import { Button, Form } from "react-bootstrap";

const SubmitMemory = () => {
  const history = useHistory();

  const [memoryData, setMemoryData] = useState({
    title: "",
    content: "",
    creator: "",
    image: "",
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          api.createMemory(memoryData);
          history.push("/");
        }}
      >
        <Form.Group>
          <h1>Bir Anı oluştur.</h1>
        </Form.Group>

        <Form.Group>
          <Form.Label>Başlık</Form.Label>
          <Form.Control
            name="title"
            type="text"
            onChange={(e) =>
              setMemoryData({ ...memoryData, title: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Yazar</Form.Label>
          <Form.Control
            name="author"
            type="text"
            onChange={(e) =>
              setMemoryData({ ...memoryData, creator: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Anınız</Form.Label>
          <Form.Control
            name="author"
            type="text"
            as="textarea"
            rows={3}
            onChange={(e) =>
              setMemoryData({ ...memoryData, content: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <ReactFileBase64
            type="file"
            multible={false}
            onDone={({ base64 }) => {
              setMemoryData({ ...memoryData, image: base64 });
            }}
          ></ReactFileBase64>
        </Form.Group>

        <Button type="submit" block>
          Gönder
        </Button>
      </Form>
    </>
  );
};

export default SubmitMemory;
