import React from "react";
import "./style.css";
import arrowRight from "./../../images/arrow-right.svg";
import arrowLeft from "./../../images/arrow-left.svg";

type PaginationPropsType = {
  currentPage: number;
  totalPage: number;
  setPageNumber?: (pageNumber: number) => void;
  direction: "rtl" | "ltr";
};

const Pagination: React.FC<PaginationPropsType> = ({
  currentPage,
  totalPage,
  setPageNumber,
  direction,
}) => {
  const setPageNumberFunc = (value: number) => {
    if (
      value <= totalPage &&
      value > 0 &&
      setPageNumber != undefined &&
      Number(currentPage) !== Number(value)
    ) {
      setPageNumber(value);
    }
  };

  return (
    <>
      {currentPage > 0 ? (
        <div
          className="paginationParent select-none"
          style={{ direction: `${direction}` }}
        >
          <div
            key={"prev"}
            onClick={() => {
              if (currentPage !== 1) {
                setPageNumberFunc(currentPage - 1);
              }
            }}
            className={`prev ${currentPage === 1 ? "disable" : ""}`}
          >
            {direction === "rtl" ? (
              <img src={arrowRight} alt="arrow right" />
            ) : (
              <img src={arrowLeft} alt="arrow left" />
            )}
          </div>
          {totalPage > 0 ? (
            <>
              {totalPage === 1 ? (
                <div
                  key={1}
                  className={`paginationNumber ${currentPage === 1 ? "currentPage" : ""}`}
                >
                  1
                </div>
              ) : totalPage === 2 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className={`paginationNumber ${currentPage === 1 ? "currentPage" : ""}`}
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className={`paginationNumber ${
                      currentPage === 2 ? "currentPage" : ""
                    }`}
                  >
                    2
                  </div>
                </>
              ) : totalPage === 3 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className={`paginationNumber ${
                      currentPage === 1 ? "currentPage" : ""
                    }`}
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className={`paginationNumber ${
                      currentPage === 2 ? "currentPage" : ""
                    }`}
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className={`paginationNumber ${
                      currentPage === 3 ? "currentPage" : ""
                    }`}
                  >
                    3
                  </div>
                </>
              ) : totalPage === 4 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className={`paginationNumber ${
                      currentPage === 1 ? "currentPage" : ""
                    }`}
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className={`paginationNumber ${
                      currentPage === 2 ? "currentPage" : ""
                    }`}
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className={`paginationNumber ${
                      currentPage === 3 ? "currentPage" : ""
                    }`}
                  >
                    3
                  </div>
                  <div
                    key={4}
                    onClick={() => setPageNumberFunc(4)}
                    className={`paginationNumber ${
                      currentPage === 4 ? "currentPage" : ""
                    }`}
                  >
                    4
                  </div>
                </>
              ) : totalPage === 5 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className={`paginationNumber ${
                      currentPage === 1 ? "currentPage" : ""
                    }`}
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className={`paginationNumber ${
                      currentPage === 2 ? "currentPage" : ""
                    }`}
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className={`paginationNumber ${
                      currentPage === 3 ? "currentPage" : ""
                    }`}
                  >
                    3
                  </div>
                  <div
                    key={4}
                    onClick={() => setPageNumberFunc(4)}
                    className={`paginationNumber ${
                      currentPage === 4 ? "currentPage" : ""
                    }`}
                  >
                    4
                  </div>
                  <div
                    key={5}
                    onClick={() => setPageNumberFunc(5)}
                    className={`paginationNumber ${
                      currentPage === 5 ? "currentPage" : ""
                    }`}
                  >
                    5
                  </div>
                </>
              ) : totalPage === 6 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className={`paginationNumber ${
                      currentPage === 1 ? "currentPage" : ""
                    }`}
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className={`paginationNumber ${
                      currentPage === 2 ? "currentPage" : ""
                    }`}
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className={`paginationNumber ${
                      currentPage === 3 ? "currentPage" : ""
                    }`}
                  >
                    3
                  </div>
                  <div
                    key={4}
                    onClick={() => setPageNumberFunc(4)}
                    className={`paginationNumber ${
                      currentPage === 4 ? "currentPage" : ""
                    }`}
                  >
                    4
                  </div>
                  <div
                    key={5}
                    onClick={() => setPageNumberFunc(5)}
                    className={`paginationNumber ${
                      currentPage === 5 ? "currentPage" : ""
                    }`}
                  >
                    5
                  </div>
                  <div
                    key={6}
                    onClick={() => setPageNumberFunc(6)}
                    className={`paginationNumber ${
                      currentPage === 6 ? "currentPage" : ""
                    }`}
                  >
                    6
                  </div>
                </>
              ) : currentPage === 1 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className={`paginationNumber currentPage`}
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className="paginationNumber"
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className="paginationNumber"
                  >
                    3
                  </div>
                  <div
                    key={totalPage + 5}
                    className={`paginationNumber betweenPages`}
                  >
                    ...
                  </div>
                  <div
                    key={totalPage - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {totalPage - 1}
                  </div>
                  <div
                    key={totalPage}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {totalPage}
                  </div>
                </>
              ) : currentPage === 2 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className="paginationNumber"
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className="paginationNumber currentPage"
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className="paginationNumber"
                  >
                    3
                  </div>
                  <div
                    key={4}
                    onClick={() => setPageNumberFunc(4)}
                    className="paginationNumber"
                  >
                    4
                  </div>
                  <div
                    key={totalPage + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={totalPage - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {totalPage - 1}
                  </div>
                  <div
                    key={totalPage}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {totalPage}
                  </div>
                </>
              ) : currentPage === 3 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className="paginationNumber"
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className={`paginationNumber `}
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className="paginationNumber currentPage"
                  >
                    3
                  </div>
                  <div
                    key={4}
                    onClick={() => setPageNumberFunc(4)}
                    className="paginationNumber"
                  >
                    4
                  </div>
                  <div
                    key={totalPage + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={totalPage - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {totalPage - 1}
                  </div>
                  <div
                    key={totalPage}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {totalPage}
                  </div>
                </>
              ) : currentPage === totalPage - 2 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className="paginationNumber"
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className="paginationNumber"
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className="paginationNumber"
                  >
                    3
                  </div>
                  <div
                    key={totalPage + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={totalPage - 3}
                    onClick={() => setPageNumberFunc(totalPage - 3)}
                    className="paginationNumber"
                  >
                    {totalPage - 3}
                  </div>
                  <div
                    key={totalPage - 2}
                    onClick={() => setPageNumberFunc(totalPage - 2)}
                    className="paginationNumber currentPage"
                  >
                    {totalPage - 2}
                  </div>
                  <div
                    key={totalPage - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className={`paginationNumber `}
                  >
                    {totalPage - 1}
                  </div>
                  <div
                    key={totalPage}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {totalPage}
                  </div>
                </>
              ) : currentPage === totalPage - 1 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className="paginationNumber"
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className="paginationNumber"
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className="paginationNumber"
                  >
                    3
                  </div>
                  <div
                    key={totalPage + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={totalPage - 2}
                    onClick={() => setPageNumberFunc(totalPage - 2)}
                    className="paginationNumber"
                  >
                    {totalPage - 2}
                  </div>
                  <div
                    key={totalPage - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber currentPage"
                  >
                    {totalPage - 1}
                  </div>
                  <div
                    key={totalPage}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {totalPage}
                  </div>
                </>
              ) : currentPage === totalPage ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className="paginationNumber"
                  >
                    1
                  </div>
                  <div
                    key={2}
                    onClick={() => setPageNumberFunc(2)}
                    className="paginationNumber"
                  >
                    2
                  </div>
                  <div
                    key={3}
                    onClick={() => setPageNumberFunc(3)}
                    className="paginationNumber"
                  >
                    3
                  </div>
                  <div
                    key={totalPage + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={totalPage - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {totalPage - 1}
                  </div>
                  <div
                    key={totalPage}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber currentPage"
                  >
                    {totalPage}
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => setPageNumberFunc(1)}
                    className="paginationNumber"
                    key={1}
                  >
                    1
                  </div>
                  <div
                    onClick={() => setPageNumberFunc(2)}
                    className="paginationNumber"
                    key={2}
                  >
                    2
                  </div>
                  <div
                    key={totalPage + 1}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={currentPage - 1}
                    onClick={() => setPageNumberFunc(currentPage - 1)}
                    className="paginationNumber"
                  >
                    {currentPage - 1}
                  </div>
                  <div
                    key={currentPage}
                    onClick={() => setPageNumberFunc(currentPage)}
                    className="paginationNumber currentPage"
                  >
                    {currentPage}
                  </div>
                  <div
                    key={currentPage + 1}
                    onClick={() => setPageNumberFunc(currentPage + 1)}
                    className="paginationNumber"
                  >
                    {currentPage + 1}
                  </div>
                  {currentPage !== totalPage - 3 ? (
                    <div
                      key={totalPage + 2}
                      className="paginationNumber betweenPages"
                    >
                      ...
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    key={totalPage - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {totalPage - 1}
                  </div>
                  <div
                    key={totalPage}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {totalPage}
                  </div>
                </>
              )}
            </>
          ) : (
            <></>
          )}

          <div
            key={"next"}
            onClick={() => {
              if (currentPage !== totalPage) {
                setPageNumberFunc(currentPage + 1);
              }
            }}
            className={`next ${currentPage === totalPage ? "disable" : ""}`}
          >
            {direction === "rtl" ? (
              <img src={arrowLeft} alt="arrow left" />
            ) : (
              <img src={arrowRight} alt="arrow right" />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Pagination;
