import React from "react";
// import { css } from "react-emotion";
import { PacmanLoader } from "react-spinners";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

export default class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <PacmanLoader
          // className={override}
          sizeUnit={"px"}
          size={30}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
