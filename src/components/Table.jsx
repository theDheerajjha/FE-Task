import React, { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import Select from "react-select";

const Table = () => {
  const [records, setRecords] = useState(() => {
    const storedRecords = localStorage.getItem("tableRecords");
    return storedRecords
      ? JSON.parse(storedRecords)
      : [
          {
            id: 1,
            name: "Record 1",
            company: "Company A",
            status: "Active",
            lastUpdated: "2023-07-01",
            notes: "Lorem ipsum dolor sit amet",
          },
          {
            id: 2,
            name: "Record 2",
            company: "Company B",
            status: "Inactive",
            lastUpdated: "2023-06-28",
            notes: "Consectetur adipiscing elit",
          },
          {
            id: 3,
            name: "Record 3",
            company: "Company C",
            status: "Active",
            lastUpdated: "2023-07-02",
            notes: "Sed do eiusmod tempor incididunt",
          },
        ];
  });

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const populateFilterOptions = () => {
    const uniqueStatusValues = Array.from(
      new Set(records.map((record) => record.status))
    );
    const options = uniqueStatusValues.map((value) => ({
      value,
      label: value,
    }));
    setFilterOptions(options);
  };

  useEffect(() => {
    populateFilterOptions();
  }, [records]);

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
  };

  const filteredRecords = selectedFilters.length
    ? records.filter((record) =>
        selectedFilters.some((option) => option.value === record.status)
      )
    : records;

  return (
    <div>
      <div className="filter-container">
        <Select
          options={filterOptions}
          isMulti
          value={selectedFilters}
          onChange={handleFilterChange}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{record.name}</td>
              <td>{record.company}</td>
              <td>{record.status}</td>
              <td>{record.lastUpdated}</td>
              <td>{record.notes}</td>
              <td>
                <IoTrashOutline
                  className="delete-icon"
                  onClick={() => deleteRecord(record.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
