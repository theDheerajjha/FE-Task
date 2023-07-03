import React, { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";

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
            selected: false,
          },
          {
            id: 2,
            name: "Record 2",
            company: "Company B",
            status: "Inactive",
            lastUpdated: "2023-06-28",
            notes: "Consectetur adipiscing elit",
            selected: false,
          },
          {
            id: 3,
            name: "Record 3",
            company: "Company C",
            status: "Active",
            lastUpdated: "2023-07-02",
            notes: "Sed do eiusmod tempor incididunt",
            selected: false,
          },
        ];
  });

  const [selectAll, setSelectAll] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    company: "",
    status: "",
    lastUpdated: "",
    notes: "",
  });

  useEffect(() => {
    localStorage.setItem("tableRecords", JSON.stringify(records));
  }, [records]);

  const toggleSelectAll = () => {
    const updatedRecords = records.map((record) => ({
      ...record,
      selected: !selectAll,
    }));
    setRecords(updatedRecords);
    setSelectAll(!selectAll);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const handleAddMember = () => {
    setIsAddMemberOpen(true);
  };

  const handleCancelAddMember = () => {
    setIsAddMemberOpen(false);
    setNewMember({
      name: "",
      company: "",
      status: "",
      lastUpdated: "",
      notes: "",
    });
  };

  const handleSubmitAddMember = () => {
    const id = records.length + 1;
    const newRecord = {
      id,
      ...newMember,
      selected: false,
    };
    setRecords([...records, newRecord]);
    setIsAddMemberOpen(false);
    setNewMember({
      name: "",
      company: "",
      status: "",
      lastUpdated: "",
      notes: "",
    });
  };

  return (
    <div>
      <div className="header">
        <h2 className="table-header">Team Members</h2>
        <button onClick={handleAddMember} className="add-member-button">
          Add Members +
        </button>
      </div>
      {isAddMemberOpen && (
        <div className="add-member-modal">
          <div className="add-member-modal-content">
            <h3>Add New Member</h3>
            <form>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
              />

              <label htmlFor="company">Company:</label>
              <input
                type="text"
                id="company"
                value={newMember.company}
                onChange={(e) =>
                  setNewMember({ ...newMember, company: e.target.value })
                }
              />

              <label htmlFor="status">Status:</label>
              <input
                type="text"
                id="status"
                value={newMember.status}
                onChange={(e) =>
                  setNewMember({ ...newMember, status: e.target.value })
                }
              />

              <label htmlFor="lastUpdated">Last Updated:</label>
              <input
                type="text"
                id="lastUpdated"
                value={newMember.lastUpdated}
                onChange={(e) =>
                  setNewMember({ ...newMember, lastUpdated: e.target.value })
                }
              />

              <label htmlFor="notes">Notes:</label>
              <textarea
                id="notes"
                value={newMember.notes}
                onChange={(e) =>
                  setNewMember({ ...newMember, notes: e.target.value })
                }
              />

              <div className="add-member-modal-buttons">
                <button
                  type="button"
                  onClick={handleCancelAddMember}
                  className="add-member-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAddMember}
                  className="add-member-submit-button"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="table">
        {/* Table header */}
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <input
                  type="checkbox"
                  checked={record.selected}
                  onChange={() => {
                    const updatedRecords = records.map((rec) => {
                      if (rec.id === record.id) {
                        return {
                          ...rec,
                          selected: !rec.selected,
                        };
                      }
                      return rec;
                    });
                    setRecords(updatedRecords);
                    setSelectAll(updatedRecords.every((rec) => rec.selected));
                  }}
                />
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
