import React from "react";
import axios from "axios";

class Displayer extends React.Component {
  state = {
    stDetails: [],
  };

  async componentDidMount() {
    const { data } = await axios.get("/stdetails");
    this.setState({ stDetails: data });
  }

  handleDelete = async (a) => {
    try {
      const response = await axios.delete(`/stdetails/${a}`);
      console.log(response.data);
      const stDetails = [
        ...this.state.stDetails.filter((obj) => obj.rollNo !== a),
      ];
      this.setState({ stDetails });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { stDetails } = this.state;
    var i = 0;
    return (
      <div className="container">
        <table className="table table-dark">
          <thead>
            <tr>
              <td>S.No</td>
              <td>Roll No.</td>
              <td>Name</td>
              <td>Hostel</td>
              <td>Menu</td>
              <td>Room No.</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {stDetails.map((a) => {
              i = i + 1;
              return (
                <tr key={a.rollNo}>
                  <td>{i}</td>
                  <td>{a.rollNo}</td>
                  <td>{a.name}</td>
                  <td>{a.hostel}</td>
                  <td>{a.menu}</td>
                  <td>{a.roomNo}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(a.rollNo)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Displayer;
