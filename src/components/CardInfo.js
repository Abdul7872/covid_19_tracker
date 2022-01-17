import React from "react";
import { Card } from "antd";
import CountUp from "react-countup";
import numeral from "numeral";

export const CardInfo = ({ title, cases, total, active, onClick }) => {
  return (
    <Card
      className={active ? "activeCard" : ""}
      onClick={onClick}
      style={{ width: 200,marginBottom:"1rem", borderRadius: 10, boxShadow: "5px 5px 10px gray" }}
      bordered={false}
    >
      <div style={{ fontSize: 18, marginBottom: 6, fontWeight: "bold" }}>
        {title}
      </div>
      <Card.Meta title={`+${numeral(cases).format("0.0a")}`} />
      <CountUp end={total} duration={2} suffix=" total" />
    </Card>
  );
};
