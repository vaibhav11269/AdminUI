import { useState, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "./Pagination";
import UserRow from "./UserRow";
import "./Table.css";

function Table({ users, setUsers, loading }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [showFooter, setShowFooter] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const checkAll = useRef(false);

  // ------------ Pagination ---------
  let indexOfLastRow = currentPage * rowsPerPage;
  let indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows =
    searchText.length > 0
      ? searchResults.length > 0
        ? searchResults.slice(indexOfFirstRow, indexOfLastRow)
        : []
      : users.slice(indexOfFirstRow, indexOfLastRow);

  let totalRows =
    searchText.length > 0
      ? searchResults.length > 0
        ? searchResults.length
        : searchResults.length
      : users.length;
  let totalPages = Math.ceil(totalRows / rowsPerPage);

  const paginate = (pageNumber) => {
    checkAll.current.checked = false;
    selectedUsers.map((data) => {
      data.isChecked = false;
    });
    setSelectedUsers([]);
    setCurrentPage(pageNumber);
    setShowFooter(false);
  };
  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
      setShowFooter(false);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setShowFooter(false);
    }
  };

  //-----------Search---------------
  const handleChange = (e) => {
    setCurrentPage(1);
    setSearchText(e.target.value);
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filteredData = users.filter((data) => {
        if (
          data.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.role.toLowerCase().includes(searchInput.toLowerCase())
        )
          return data;
      });
      setSearchResults(filteredData);
    } else {
      setSearchResults(users);
    }
  };
  //-----------CRUD Operations-------------

  //------------Update/Edit---------------------
  const handleEdit = (modifiedUser) => {
    const modifiedUsersData = users.map((data) => {
      if (data.id === modifiedUser.id) {
        data.name = modifiedUser.name;
        data.email = modifiedUser.email;
        data.role = modifiedUser.role;
      }
      return data;
    });
    setUsers(modifiedUsersData);
  };
  //------------Delete---------------
  const singleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      if (searchResults.length !== 0) {
        setSearchResults(searchResults.filter((result) => result.id !== id));
      }
      setUsers(
        users.filter((user) => {
          return user.id !== id;
        })
      );
    }
  };
  const multiDelete = () => {
    if (window.confirm("Are you sure you want to delete this?")) {
      if(searchResults.length>0){
        const newRowData = searchResults.filter((data) => !selectedUsers.includes(data));
        setUsers(users.filter((data) => !selectedUsers.includes(data)));
        if(newRowData.length>0){
          setSearchResults(newRowData);
        }else{
          setSearchResults([]);
        }
        setShowFooter(false);
        checkAll.current.checked = false;
      }
      else{
        const newRowData = users.filter((data) => !selectedUsers.includes(data));
        setUsers(newRowData);
        let userLength = newRowData.length;
        let totalPages = Math.ceil(userLength / rowsPerPage);
        if (currentPage > totalPages - 1) paginate(totalPages);
        else paginate(currentPage);
        setShowFooter(false);
        checkAll.current.checked = false;
      }
    }
  };
  //---------------RowCheckBox----------------
  const handleCheck = (e, id) => {
    let currentSelected = [...selectedUsers];
    users.forEach((user, index) => {
      if (user.id === id) {
        setShowFooter(e.target.checked);
        user.isChecked = !user.isChecked;
        if (user.isChecked) currentSelected.push(user);
        else currentSelected = currentSelected.filter((data) => data.id !== id);
      }
    });
    setSelectedUsers(currentSelected);
  };
  //------------------HeaderCheckBox------------------
  const selectAll = (e) => {
    checkAll.current.checked = e.target.checked;
    let isSelected = e.target.checked;
    let currentlySelected;
    if(searchText.length> 0 && searchResults.length>0){
        currentlySelected=[];
        for(let index=0;index<searchResults.length;index++){
          currentlySelected.push(searchResults[index]);
        }
    }
    else{
      currentlySelected = [...selectedUsers];
      for (let index = rowsPerPage; index > 0; index--) {
        if (currentPage * rowsPerPage - index < users.length)
          currentlySelected.push(users[currentPage * rowsPerPage - index]);
      }
  }
    currentlySelected.forEach((user) => {
      user.isChecked = isSelected;
    });
    setSelectedUsers(currentlySelected);
    setShowFooter(isSelected);
  };
  //----------------Loading State-----------------
  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center loading-section">
        <div className="spinner-border" role="status"></div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="table-manual">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          className="input my-2"
          value={searchText}
          onChange={handleChange}
        ></input>
        <SearchIcon fontSize="medium" sx={{ color: "#000", mr: 1 }} />
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-dark">
            <th>
              <input type="checkBox" onClick={selectAll} ref={checkAll}></input>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        {currentRows.length === 0 ? (
          <tbody>
            <tr>
              <td>
                <div className="alert alert-info message" role="alert">
                  <span>No Records Found!</span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentRows.map((data) => (
              <UserRow
                key={data.id}
                data={data}
                handleEdit={handleEdit}
                handleDelete={singleDelete}
                handleCheck={handleCheck}
              />
            ))}
          </tbody>
        )}
      </table>

      <div className="footer">
        {showFooter === true ? (
          <button className="delete-selected-btn" onClick={() => multiDelete()}>
            Delete Selected
          </button>
        ) : null}
        {totalRows > 10 && (
          <Pagination
            totalRows={totalRows}
            rowsPerPage={rowsPerPage}
            current={currentPage}
            setCurrentPage={setCurrentPage}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      </div>
    </div>
  );
}

export default Table;
