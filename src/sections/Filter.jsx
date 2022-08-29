import React from "react";
import { Button, Col, Input, Row, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

export default function Filter({ filters, onSetFilters }) {
  const handleSearch = (e) => {
    onSetFilters((prevState) => ({
      ...prevState,
      search: e.target.value,
    }));
  };

  const handleSelectGender = (value) => {
    onSetFilters((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  const handleReset = () => {
    onSetFilters({
      search: "",
      gender: "all",
    });
  };

  return (
    <section>
      <Row gutter={[4, 8]}>
        <Col xs={{ span: 24 }} sm={{ span: 6 }}>
          <Search
            data-testid="search-input"
            value={filters.search}
            placeholder="Search..."
            onChange={handleSearch}
            enterButton
          />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }}>
          <Select
            data-testid="gender-select"
            value={filters.gender}
            onChange={handleSelectGender}
            style={{ width: "100%" }}
          >
            <Option key="All" value="all">
              All
            </Option>
            <Option key="Male" value="male">
              Male
            </Option>
            <Option key="Female" value="female">
              Female
            </Option>
          </Select>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 3 }}>
          <Button
            data-testid="reset-button"
            style={{ minWidth: "100%" }}
            onClick={handleReset}
          >
            Reset Filter
          </Button>
        </Col>
      </Row>
    </section>
  );
}
