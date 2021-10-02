import React, { Component } from "react";
import TextLoop from "react-text-loop";
import "./Draw.css";
import { Button, Row, Col } from "react-bootstrap";
import ShowPassModal from "../pages/common/ShowPassModel";
import car2drawbg from "../../../../assets/images/car2drawbg.jpg";

class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("acc-token") === null) {
      this.props.history.push("/restricted");
      return null;
    }
    this.showConfirmModal = React.createRef();
    this.state = {
      items: [],
      drawItems: [],
      currentItems: [],
      pastDrawnItems: [],
      result: "",
      showTextAnimation: true,
      removeDrawnItem: true,
      animationInterval: 150,
      showResult: false,
      disableDrawButton: false,
      value: "",
      valid: false,
      touched: false,
      showConfirm: false,
      validationRules: {
        minLength: 2,
        isRequired: true,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSkipAnimationChange = this.handleSkipAnimationChange.bind(this);
    this.handleRemoveDrawnItemChange =
      this.handleRemoveDrawnItemChange.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }
  async getUsers() {
    await fetch(
      `http://amazingpak.com/mydreamcommittee/v1/controller/user.php?committee=${this.props.match.params.data}&status=approved`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          ...this.state,
          items: result.data.users,
          currentItems: result.data.users,
        });
      })
      .catch((e) => console.log(e));
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.drawItems.length > 1) {
      let formInputItems = this.state.drawItems;
      let itemList = formInputItems.split("\n");
      this.setState({
        ...this.state,
        items: itemList,
        currentItems: itemList,
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.name]: e.value });
  }

  handleSkipAnimationChange = () => {
    this.setState({ showTextAnimation: !this.state.showTextAnimation });
  };

  handleRemoveDrawnItemChange = () => {
    this.setState({ removeDrawnItem: !this.state.removeDrawnItem });
  };

  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  randomDrawItem = () => {
    const { currentItems, showTextAnimation, removeDrawnItem } = this.state;
    const currItems = currentItems.map((res) => {
      return res.membershipId;
    });

    var tuna = currentItems.find(function (sandwich) {
      return sandwich.customwinner === "true";
    });
    this.setState({
      ...this.state,
      showResult: true,
      disableDrawButton: true,
    });

    let getIndex;
    if (tuna) {
      getIndex = currentItems.indexOf(tuna);
    } else {
      let maxItemIndex = currItems.length;
      getIndex = Math.floor(Math.random() * maxItemIndex);
    }
    const randomIndex = getIndex;
    // let maxItemIndex = currItems.length;
    // // const getIndex = currentItems.indexOf(tuna)
    // // console.log(getIndex)
    // const randomIndex = Math.floor(Math.random() * maxItemIndex);
    // // const randomIndex = getIndex
    this.sleep(showTextAnimation ? 30000 : 0).then(() => {
      this.setState({
        ...this.state,
        result: currItems[randomIndex],
        pastDrawnItems: [...this.state.pastDrawnItems, currItems[randomIndex]],
        showResult: false,
        disableDrawButton: false,
        showConfirm: true,
      });
    });
    if (removeDrawnItem) {
      const copyCurrentItems = [...this.state.currentItems];
      copyCurrentItems.splice(randomIndex, 1);
      this.setState({
        currentItems: copyCurrentItems,
      });
    }
  };
  showModal = () => {
    this.showConfirmModal.showModal();
  };
  hideConfirm = () => {
    this.setState({ showConfirm: false });
  };
  render() {
    const {
      items,
      // drawItems,
      currentItems,
      result,
      disableDrawButton,
      // pastDrawnItems,
      // placeholder,
      showResult,
      showConfirm,
    } = this.state;
    // console.log(items)

    const newItems = items.map((res) => {
      return res.membershipId;
    });

    return (
      <div
        location={this.props.history}
        className="mainn"
        style={{
          height: "753px",
          backgroundImage: `url(${car2drawbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          display: "flex",
          alignContent: "center",
        }}
      >
        <div className="center-main">
          {items.length !== 0 && (
            <div className="draw-block">
              <Row>
                <Col md={12} sm={12}>
                  <div className="draw-section">
                    {showResult && items && (
                      <TextLoop
                        className="draw-text"
                        interval={100}
                        springConfig={{ stiffness: 250, damping: 10 }}
                        children={newItems}
                      />
                    )}
                    {!showResult && result}
                  </div>
                  <Row>
                    <Col md={12} sm={12}>
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "rgb(252, 143, 0)",
                          padding: "10px",
                          width: "500px",
                          border: "none",
                        }}
                        pill
                        name="drawButton"
                        onClick={this.randomDrawItem}
                        disabled={disableDrawButton || currentItems.length <= 1}
                      >
                        {disableDrawButton ? "Drawing..." : "Draw"}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <br />
              {showConfirm && (
                <Row>
                  <Col md={12} sm={12}>
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "none",
                        padding: "10px",
                        width: "200px",
                      }}
                      onClick={this.showModal}
                    >
                      Confirm
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          )}
        </div>
        {showConfirm && (
          <ShowPassModal
            ref={(target) => (this.showConfirmModal = target)}
            user={result}
            hideConfirm={this.hideConfirm}
            location={this.props.history}
          />
        )}
      </div>
    );
  }
}

export default App;
