import React from "react";
import { Button } from "@material-ui/core";

const Header = () => {
  return (
    <div>
      <Button className="float-right" variant="outlined" color="primary">
        Connect Thanos Wallet
      </Button>
    </div>
  );
};

export default Header;
