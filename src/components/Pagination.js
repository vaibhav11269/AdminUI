import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import "./Pagination.css";

const Pagination = ({
  rowsPerPage,
  totalRows,
  current,
  paginate,
  prevPage,
  nextPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination modal-3 pagination-flush">
        <li className={`page-item ${current === 1 ? "disable" : ""}`}>
          <a className="icon-section" onClick={() => paginate(1)} href="!#">
            <KeyboardDoubleArrowLeftIcon fontSize="small" />
          </a>
        </li>
        <li className="page-item">
          <a className="icon-section" onClick={prevPage} href="!#">
            <ArrowBackIosNewIcon fontSize="small" />
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === current ? "page-item active" : "page-item"}
          >
            <a className="page-link" href="!#" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="icon-section" onClick={nextPage} href="!#">
            <ArrowForwardIosIcon fontSize="small" />
          </a>
        </li>
        <li
          className={`page-item${
            current === pageNumbers.length - 1 ? " disable" : ""
          }`}
        >
          <a
            className="icon-section"
            onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}
            href="!#"
          >
            <KeyboardDoubleArrowRightIcon fontSize="small" />
          </a>
        </li>
        <li>
          <i className="bi bi-search"></i>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
