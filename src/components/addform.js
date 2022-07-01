import React from "react";
import Joi from "joi";
import axios from "axios";

class AddForm extends React.Component {
  state = {
    stDetails: {
      rollNo: "",
      name: "",
      hostel: "...",
      menu: "...",
      roomNo: 0,
    },
    error: undefined,
  };

  submitHandler = async (e) => {
    e.preventDefault();

    const schema = Joi.object({
      rollNo: Joi.string()
        .required()
        .pattern(/^(EE|HS|CS|ME|CE|NA|)20B\d\d\d$/, "RollNo."),
      name: Joi.string().required(),
      hostel: Joi.required(),
      menu: Joi.required(),
      roomNo: Joi.number().greater(0).required(),
    });
    const { error } = schema.validate(this.state.stDetails);

    if (error) this.setState({ error: error.details[0].message });
    else {
      const { stDetails } = this.state;
      this.setState({ error: undefined });
      try {
        const response = await axios.post("/stdetails", {
          rollNo: stDetails.rollNo,
          name: stDetails.name,
          hostel: stDetails.hostel,
          menu: stDetails.menu,
          roomNo: stDetails.roomNo,
        });
        console.log(response);
        alert("submitted successfully...");
        window.location = "/";
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleChange = ({ target: a }) => {
    const data = { ...this.state.stDetails };
    data[a.id] = a.value;
    this.setState({ stDetails: data });
  };

  render() {
    const { stDetails, error } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.submitHandler}>
          <div className="row g-15">
            <div className="mb-2 col">
              <label className="form-label" htmlFor="rollNo">
                Roll No.
              </label>
              <input
                type="text"
                className="form-control"
                id="rollNo"
                onChange={this.handleChange}
                value={stDetails.rollNo}
              />
            </div>
            <div className="md-2 col">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control "
                id="name"
                onChange={this.handleChange}
                value={stDetails.name}
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="mb-3 col-sm">
              <label className="form-label" htmlFor="hostel">
                Hostel
              </label>
              <select
                id="hostel"
                className="form-select"
                onChange={this.handleChange}
                value={stDetails.hostel}
              >
                <option>{"..."}</option>
                <option>Ganga</option>
                <option>Sindhu</option>
                <option>Jamuna</option>
                <option>Pampara</option>
              </select>
            </div>
            <div className="col-sm mb-3">
              <label className="form-label" htmlFor="menu">
                Menu
              </label>
              <select
                id="menu"
                className="form-select"
                value={stDetails.menu}
                onChange={this.handleChange}
              >
                <option>{"..."}</option>
                <option>South</option>
                <option>North</option>
              </select>
            </div>
            <div className="col-sm mb-3">
              <label className="form-label" htmlFor="roomNo">
                Room No.
              </label>
              <input
                id="roomNo"
                type="number"
                className="form-control form-control"
                onChange={this.handleChange}
                value={stDetails.roomNo}
              />
            </div>
          </div>
          {error ? <div className="alert alert-danger">{error}</div> : null}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddForm;
