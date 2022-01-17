import React from "react";
import { Table } from "antd";
import numeral from "numeral";

export const TableData = ({ countries }) => {
  const columns = [
    {
      title: "Country Name",
      dataIndex: "country",
    },
    {
      title: "Active Cases",
      dataIndex: "cases",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.cases - b.cases,
      render: (data) => <b>{numeral(data).format("0,0")}</b>,
      width: "40%",
    },
  ];

  return (
    <div className="table">
      <Table
        colSpan={2}
        columns={columns}
        rowKey={(country, index = 0) => index.toString()}
        dataSource={countries}
        pagination={false}
        size="small"
        scroll={{ y: 470 }}
        title={() => (
          <h2>
            <b>Active Cases by Country</b>
          </h2>
        )}
      />
    </div>
  );
};
