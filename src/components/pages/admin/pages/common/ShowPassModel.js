import React, { useState } from "react";
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
        width: "50%",
        height: "50%",
    },
};
Modal.setAppElement('#root')
class ShowPassModal extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            visible: false,
            user: ''
        };
    }
    componentDidMount() {
        this.getUser()
    }
    getUser() {
        const membershipId = this.props.user;
        fetch(`https://mydreamcommittee.com/v1/user/${membershipId}`,{
            method:'GET',
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            // this.setState({user:result})
        })
        .catch(err => console.log(err));

        // let formdata = new FormData();
        // formdata.append("membershipid", this.props.user);
        // fetch('http://mydreamcommittee.com/winner.php', {
        //     method: 'POST',
        //     body: formdata
        // })
        //     .then((res) => res.text())
        //     .then((result) => { this.setState({ user: result }) })
        //     .catch(err => console.log(err))
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    closeModal = () => {
        this.setState({ visible: false });
        this.props.hideConfirm()

    };
    setWinner = () => {
        const membershipId = this.props.user
        fetch(`https://mydreamcommittee.com/v1/user/${membershipId}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            this.closeModal()
        })
        .catch(err => console.log(err));

        // let formdata = new FormData();
        // formdata.append("membershipid", this.props.user);
        // fetch('http://mydreamcommittee.com/winnerdetails.php', {
        //     method: 'POST',
        //     body: formdata
        // })
        //     .then((res) => res.text())
        //     .then((result) => { this.closeModal() })
        //     .catch(err => console.log(err))
    }

    render() {

        const { visible, loading } = this.state;
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
                        flexDirection: 'column'
                    }}
                >
                    <Row>
                        <Col>
                            <h1>Congratulations</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>{this.state.user}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button color="primary" onClick={this.setWinner}>
                                OK
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}

export default ShowPassModal;