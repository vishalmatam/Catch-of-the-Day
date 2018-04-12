import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };
  myInput = React.createRef();
  goToStore = event => {
    //1. Prevent default form re-submitting
    event.preventDefault();
    //2. get text from the input
    const storeName = this.myInput.value.value;
    //3. Change store to /store/whatever-they-enter
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <React.Fragment>
        <p>Fish!</p>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a store!</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store -></button>
        </form>
      </React.Fragment>
    );
  }
}

export default StorePicker;
