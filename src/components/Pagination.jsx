// File: src/components/Pagination.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPreviousPage }) => {
  return (
    <div className="flex justify-between items-center mt-4 mb-4">
      <Button onClick={onPreviousPage} disabled={currentPage === 1}>
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
};

export default Pagination;