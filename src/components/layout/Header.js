import React from "react";
import { connect } from "react-redux";
import { connectWallet } from "../../actions";
import { Button } from "@material-ui/core";

const Header = ({ connectWallet }) => {
  return (
    <div>
      <Button className="float-right" variant="outlined" color="primary" onClick={connectWallet}>
        Connect Thanos Wallet
      </Button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps, { connectWallet })(Header);
