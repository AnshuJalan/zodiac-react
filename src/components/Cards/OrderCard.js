import React from "react";
import { Card, CardContent, Button } from "@material-ui/core";

const OrderCard = () => {
  return (
    <Card style={{ margin: 5 }}>
      <CardContent style={{ padding: "4px 16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={itemSpan}>
            <img
              alt="icon"
              src={process.env.PUBLIC_URL + "/images/tz-icon.png"}
              width="20"
            />
            <span style={{ fontWeight: "bold", marginLeft: 10 }}>0.8</span>
          </span>

          <span style={{ ...itemSpan, marginRight: "200px" }}>
            <span
              style={{ fontSize: 20, color: "black" }}
              className="material-icons"
            >
              local_mall
            </span>

            <span style={{ fontWeight: "bold", marginLeft: 10 }}>1.7</span>
          </span>
          <Button color="primary">Take</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const itemSpan = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default OrderCard;
