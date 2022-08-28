import React from "react";
import { Table } from "antd";
import "./users-style.css";
import { columns } from "../constant";

export default function Users({ loading, data }) {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params ", pagination, filters, sorter, extra);
  };

  return (
    <section id="user-list">
      <Table
        loading={loading}
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </section>
  );
}
