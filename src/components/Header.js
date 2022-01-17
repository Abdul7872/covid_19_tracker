import React from "react";
import { Select } from "antd";

export const Header = ({ countries, onChange }) => {
  return (
    <div className="header">
      <div>
        <h1>
          <b>Covid_19 Tracker</b>
        </h1>
      </div>
      <div>
        <img
          style={{ height: 40, width: 150 }}
          alt="corona"
          src="https://media.tghn.org/medialibrary/2020/04/covid19_logo.png"
        ></img>
      </div>

      <div>
        <Select
          showSearch
          style={{ width: 145 }}
          optionFilterProp="children"
          onChange={onChange}
          defaultValue={"worldwide"}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option value="worldwide">Worldwide</Select.Option>
          {countries.map((country, idx) => (
            <Select.Option key={idx} value={country.countryInfo._id}>
              {country.country}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
