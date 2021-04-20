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
        <div>
          
        </div>
    );
  }
}

export default Main;
