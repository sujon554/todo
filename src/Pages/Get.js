import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";

const Get = () => {
  const [list, setList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState();

  //   get list from api
  useEffect(() => {
    fetch("https://task.atiar.info/api/todo")
      .then((res) => res.json())
      .then((data) => setList(data.data));
  }, []);

  //   /Delete list from api
  const deleteHandler = (id) => {
    console.log(id);
    fetch(
      "https://task.atiar.info/api/todo/delete",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id: id }),
      }
    )
      .then((res) => res.json())
      .then((data) => setList(data));
  };

  const onSubmit = (data) => {
    const proceed = window.confirm("Are you sure, you want to Add ToDo?");
    if (proceed) {
      axios
        .post("https://task.atiar.info/api/todo/create", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.insertedId) {
            reset();
            setSuccess("Added Successfully !");
          }
        });
    }
  };

  return (
    <div>
      <Button onClick={handleShow}>Add</Button>
      {list.map((list) => (
        <div key={list.id}>
          <h1>{list.title}</h1>
          <p>{list.note}</p>
          <p>
            Start Date: {list.start_date} || <span>{list.start_time}</span> ||
            End Date: <span>{list.end_date}</span> <span>{list.end_time}</span>
          </p>
          <h3>{list.id}</h3>
          <Button onClick={() => deleteHandler(list.id)}>Delete</Button>
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input
              style={{ outline: "none" }}
              className="mb-3 py-2 px-3"
              placeholder="Write Task Title"
              {...register("title", { required: true })}
            />

            <textarea
              style={{ outline: "none" }}
              className="mb-3 py-2 px-3"
              placeholder="Write Task Note"
              {...register("note", { required: true })}
            />

            <input
              type="date"
              style={{ outline: "none" }}
              className="mb-3 py-2 px-3"
              placeholder="start date"
              {...register("start_date", { required: true })}
            />

            <input
              type="time"
              style={{ outline: "none" }}
              className="mb-3 py-2 px-3"
              placeholder="start Time"
              {...register("start_time", { required: true })}
            />

            <input
              type="date"
              style={{ outline: "none" }}
              className="mb-3 py-2 px-3"
              placeholder="End  date"
              {...register("end_date", { required: true })}
            />

            <input
              type="time"
              style={{ outline: "none" }}
              className="mb-3 py-2 px-3"
              placeholder="End Time"
              {...register("end_time", { required: true })}
            />

            <Button type="submit">Add</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <h5 className="text-center text-danger">{success}</h5> <br></br>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Get;
