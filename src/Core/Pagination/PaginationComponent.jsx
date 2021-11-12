import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({ page, setPage, hasNextPage }) => {
  const goToPage = (amount) => {
    setPage(page - 1 + amount);
  };
  return (
    <>
      <Pagination>
        {page !== 1 && <Pagination.Prev onClick={() => goToPage(-1)} />}
        {page !== 1 && (
          <Pagination.Item onClick={() => setPage(0)}>1</Pagination.Item>
        )}
        {page > 2 && <Pagination.Ellipsis />}
        {page > 2 && (
          <Pagination.Item onClick={() => goToPage(-1)}>
            {page - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{page}</Pagination.Item>
        {hasNextPage && (
          <Pagination.Item onClick={() => goToPage(1)}>
            {page + 1}
          </Pagination.Item>
        )}
        {hasNextPage && <Pagination.Next onClick={() => goToPage(1)} />}
      </Pagination>
    </>
  );
};

export default PaginationComponent;
