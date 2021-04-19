import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import './Content.css';

class Main extends Component {
//   constructor(props) {
//     super(props);

//     this.showGroupModal = React.createRef();
//     this.state = {
//       name: "",
//       idCard: "",
//       fatherName: "",
//       mobileNo: "",
//       address: "",
//       cityname: "",
//       memberShipId: "",
//       referenceId: "",
//       winner: false,
//       customWinner: false,
//       loading: false,
//       nameErorr: false,
//       idCardErorr: false,
//       fatherNameErorr: false,
//       mobileNoErorr: false,
//       addressErorr: false,
//       citynameError: false,
//       referenceIdErorr: false,
//       memberShipIdErorr: false,
//     };
//   }

//   onRegister = (e) => {
//     e.preventDefault();
//     this.setState({ loading: true });
//     const {
//       name,
//       idCard,
//       fatherName,
//       mobileNo,
//       address,
//       cityname,
//       memberShipId,
//       winner,
//       customWinner,
//       referenceId,
//       nameErorr,
//       fatherNameErorr,
//       referenceIdErorr,
//       idCardErorr,
//       mobileNoErorr,
//       addressError,
//       citynameError,
//       memberShipIdErorr,
//     } = this.state;
//     if (
//       name === "" &&
//       idCard === "" &&
//       fatherName === "" &&
//       mobileNo === "" &&
//       address === "" &&
//       cityname === "" &&
//       memberShipId === "" &&
//       referenceId === ""
//     ) {
//       this.setState({
//         loading: false,
//         idCardErorr: true,
//         fatherNameErorr: true,
//         mobileNoErorr: true,
//         addressErorr: true,
//         citynameErorr: true,
//         nameErorr: true,
//         referenceIdErorr: true,
//         memberShipIdErorr: true,
//       });
//     } else if (name === "") {
//       this.setState({ loading: false, name: true });
//     } else if (idCard === "") {
//       this.setState({ loading: false, idCardErorr: true });
//     } else if (fatherName === "") {
//       this.setState({ loading: false, fatherNameErorr: true });
//     } else if (mobileNo === "") {
//       this.setState({ loading: false, mobileNoErorr: true });
//     } else if (address === "") {
//       this.setState({ loading: false, addressErorr: true });
//     } else if (cityname === "") {
//       this.setState({ loading: false, citynameErorr: true });
//     } else if (memberShipId === "") {
//       this.setState({ loading: false, memberShipIdErorr: true });
//     } else if (referenceId === "") {
//       this.setState({ loading: false, referenceIdErorr: true });
//     } else {
//       let formdata = new FormData();

//       formdata.append("name", name);
//       formdata.append("cnic", idCard);
//       formdata.append("fathername", fatherName);
//       formdata.append("mobileno", mobileNo);
//       formdata.append("address", address);
//       formdata.append("cityname", cityname);
//       formdata.append("membershipid", memberShipId);
//       formdata.append("refrenceid", referenceId);
//       formdata.append("winner", winner);
//       formdata.append("customwinner", customWinner);
//       fetch("http://mydreamcommittee.com/user_registration.php", {
//         method: "POST",

//         body: formdata,
//       })
//         .then((res) => res.text())
//         .then((result) => {
//           if (result == "Inserted") {
//             this.showGroupModal.showModal();
//             this.setState({
//               name: "",
//               idCard: "",
//               fatherName: "",
//               mobileNo: "",
//               address: "",
//               cityname: "",
//               memberShipId: "",
//               referenceId: "",
//               winner: false,
//               customWinner: false,
//               loading: false,
//             });
//           } else {
//             this.setState({ loading: false });
//             console.log("inncorrect");
//           }
//         })

//         .catch((err) => this.setState({ loading: false }));
//     }
//   };

  render() {
    // const {
    //   name,
    //   idCard,
    //   fatherName,
    //   mobileNo,
    //   address,
    //   cityname,
    //   memberShipId,
    //   referenceId,
    //   nameErorr,
    //   fatherNameErorr,
    //   referenceIdErorr,
    //   idCardErorr,
    //   mobileNoErorr,
    //   addressErorr,
    //   citynameErorr,
    //   memberShipIdErorr,
    // } = this.state;
    return (
        <div className="container">
          <div className="form-wrapper">
            <div className="form-element">
              <Grid.Row>
                <Grid.Col md={6} xs={12} sm={12}>
                  <Form.Group label="Name" isRequired>
                    <Form.Input
                      icon="user"
                      placeholder="Name"
                      value={name}
                      onFocus={() => this.setState({ nameErorr: false })}
                      onChange={(e) =>
                        this.setState({ name: e.target.value })
                      }
                    />
                    {nameErorr && (
                      <span style={{ color: "red" }}>Please fill out this</span>
                    )}
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={6} xs={12} sm={12}>
                  <Form.Group label="CNIC" isRequired>
                    <Form.Input
                      icon="user"
                      placeholder="CNIC"
                      value={idCard}
                      onFocus={() => this.setState({ idCardErorr: false })}
                      onChange={(e) =>
                        this.setState({ idCard: e.target.value })
                      }
                    />
                    {idCardErorr && (
                      <span style={{ color: "red" }}>Please fill out this</span>
                    )}
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col md={6} xs={12} sm={12}>
                  <Form.Group label="Father Name" isRequired>
                    <Form.Input
                      icon="user"
                      placeholder="Father Name"
                      value={fatherName}
                      onFocus={() => this.setState({ fatherNameErorr: false })}
                      onChange={(e) =>
                        this.setState({ fatherName: e.target.value })
                      }
                    />
                    {fatherNameErorr && (
                      <span style={{ color: "red" }}>Please fill out this</span>
                    )}
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={6} xs={12} sm={12}>
                  <Form.Group label="Mobile No" isRequired>
                    <Form.Input
                      icon="user"
                      placeholder="Mobile No"
                      value={mobileNo}
                      onFocus={() => this.setState({ mobileNoErorr: false })}
                      onChange={(e) =>
                        this.setState({ mobileNo: e.target.value })
                      }
                    />
                    {mobileNoErorr && (
                      <span style={{ color: "red" }}>Please fill out this</span>
                    )}
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col md={6} xs={12} sm={12}>
                  <Form.Group label="Address" isRequired>
                    <Form.Input
                      icon="user"
                      placeholder="Address"
                      value={address}
                      onFocus={() => this.setState({ addressErorr: false })}
                      onChange={(e) =>
                        this.setState({ address: e.target.value })
                      }
                    />
                    {addressErorr && (
                      <span style={{ color: "red" }}>Please fill out this</span>
                    )}
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={6} xs={12} sm={12}>
                  <Form.Group label="City Name" isRequired>
                    <Form.Input
                      icon="user"
                      placeholder="City Name"
                      value={cityname}
                      onFocus={() => this.setState({ citynameErorr: false })}
                      onChange={(e) =>
                        this.setState({ cityname: e.target.value })
                      }
                    />
                    {citynameErorr && (
                      <span style={{ color: "red" }}>Please fill out this</span>
                    )}
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col md={6} xs={12} sm={12}>
                  <Form.Group label="Membership Id" isRequired>
                    <Form.Input
                      icon="user"
                      placeholder="Membership Id"
                      value={memberShipId}
                      onFocus={() =>
                        this.setState({ memberShipIdErorr: false })
                      }
                      onChange={(e) =>
                        this.setState({ memberShipId: e.target.value })
                      }
                    />
                    {memberShipIdErorr && (
                      <span style={{ color: "red" }}>Please fill out this</span>
                    )}
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={6} xs={12} sm={12}>
                  <Form.Group label="Reference Id" isRequired>
                    <Form.Input
                      icon="user"
                      placeholder="Reference Id"
                      value={referenceId}
                      onFocus={() => this.setState({ referenceIdErorr: false })}
                      onChange={(e) =>
                        this.setState({ referenceId: e.target.value })
                      }
                    />
                    {referenceIdErorr && (
                      <span style={{ color: "red" }}>Please fill out this</span>
                    )}
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col>
                  <Button.List align="right">
                    <Button
                      color="primary"
                      type="submit"
                      loading={this.state.loading}
                      onClick={this.onRegister}
                    >
                      Register
                    </Button>
                    <Button color="primary" onClick={this.goToGame}>
                      Start Draw
                    </Button>
                  </Button.List>
                </Grid.Col>
              </Grid.Row>
            </div>
          </div>
          <CreateGroupModal
            ref={(target) => (this.showGroupModal = target)}
            location={this.props.history}
          />
        </div>
    );
  }
}

export default Main;
