import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, { name, phone, email })
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="w-50 h-50 rounded-5 bg-white">
        <form onSubmit={handleUpdate}>
          <h1 className="text-center mt-5">Update</h1>

          <div className="text-center">
            Name:{" "}
            <input
              className=" px-3 my-2 rounded-2"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            Phone:{" "}
            <input
              className=" px-3 my-2 rounded-2"
              type="text"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <br></br>
            Email:{" "}
            <input
              className=" px-3 my-2 rounded-2"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <button className="btn btn-secondary mb-3">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
