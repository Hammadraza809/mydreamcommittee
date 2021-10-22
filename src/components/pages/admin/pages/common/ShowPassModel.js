import React from "react";
import Modal from "react-modal";
import { Button, Row, Col } from "react-bootstrap";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
  },
};
Modal.setAppElement("#root");
class ShowPassModal extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      visible: false,
      user: [],
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    const membershipId = this.props.user;
    fetch(
      `https://mydreamcommittee.com/v1/controller/user.php?membershipId=${membershipId}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({ user: result.data.users[0] });
      })
      .catch((err) => console.log(err));
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  closeModal = () => {
    this.setState({ visible: false });
    this.props.hideConfirm();
  };
  setWinner = () => {
    const membershipId = this.props.user;
    fetch(
      `https://mydreamcommittee.com/v1/controller/user.php?membershipId=${membershipId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        this.closeModal();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { visible, user } = this.state;
    return (
      <Modal
        isOpen={visible}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Row>
            <Col>
              <h1>
                <u>
                  <i>Congratulations</i>
                </u>
              </h1>
              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>{"Name: " + user.name}</h4>
              <h4>{"CNIC: " + user.cnic}</h4>
              <h4>{"City: " + user.city}</h4>
              <h4>{"Membership Id: " + user.membershipId}</h4>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "rgb(252, 143, 0)",
                  padding: "10px",
                  width: "100px",
                  border: "none",
                }}
                onClick={this.setWinner}
              >
                OK
              </Button>
              <br />
              <br />
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default ShowPassModal;
