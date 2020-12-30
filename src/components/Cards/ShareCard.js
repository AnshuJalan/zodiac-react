import React from "react";
import { Card, CardContent } from "@material-ui/core";

const ShareCard = (props) => {
  return (
    <Card
      style={{ margin: 5, boxShadow: "none", border: "1px solid #00000060" }}
    >
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
            <span style={{ fontWeight: "bold", marginLeft: 10 }}>
              {props.price}
            </span>
          </span>

          <span style={{ ...itemSpan }}>
            <span
              style={{ fontSize: 20, color: "black" }}
              className="material-icons"
            >
              local_mall
            </span>

            <span style={{ fontWeight: "bold", marginLeft: 10 }}>
              {props.quantity}
            </span>
          </span>

          {props.position === 0 ? (
            <span style={{ color: "#4caf50", fontWeight: "bold" }}>LONG</span>
          ) : (
            <span
              style={{ color: "#f44336", fontWeight: "bold", marginLeft: -11 }}
            >
              SHORT
            </span>
          )}
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

export default ShareCard;
