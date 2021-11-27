import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMemory } from "../axios";
import { updateMemory } from "../actions/memoryActions";
import ReactFileBase64 from "react-file-base64";
import { Button, Form } from "react-bootstrap";

const UpdateMemory = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [memoryData, setMemoryData] = useState({
    title: "",
    content: "",
    creator: "",
    image: "",
  });

  useEffect(() => {
    const getMemo = async () => {
      const { data } = await fetchMemory(id);
      setMemoryData(data);
    };

    getMemo();
  }, [id]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateMemory(id, memoryData));
          history.push("/");
        }}
      >
        <Form.Group>
          <h1>Anıyı güncelle</h1>
        </Form.Group>

        <Form.Group>
          <Form.Label>Başlık</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={memoryData.title}
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
            value={memoryData.creator}
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
            value={memoryData.content}
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
            value={memoryData.image}
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

export default UpdateMemory;
