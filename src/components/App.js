import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../Base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };
  //Lifecycle methods
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  //addFish method which updates the state
  addFish = fish => {
    //1. Take a copy of existing fishes state
    const fishes = { ...this.state.fishes };

    //2. Add our new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;

    //3. Set/Update the new fishes object to state using setState
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    //1. Take a copy of current fishes state
    const fishes = { ...this.state.fishes };

    //2. Update the fish
    fishes[key] = updatedFish;

    //set state
    this.setState({ fishes });
  };

  deleteFish = key => {
    //1. Take a copy of fishes state
    const fishes = { ...this.state.fishes };

    //2. delete a fish from fishes
    fishes[key] = null;

    //2. set state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    //1. Take a copy of existing order state
    const order = { ...this.state.order };

    //2. Either add to order or update the number on the order
    order[key] = order[key] + 1 || 1;

    //3. Set state
    this.setState({ order });
  };

  removeFromOrder = key => {
    //1. Take a copy of existing order state
    const order = { ...this.state.order };

    //2. remove item from order
    delete order[key];

    //3. Set state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
