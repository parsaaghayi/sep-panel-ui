import React from "react";
import "./style.css";
import arrowRight from "./../../images/arrow-right.svg";
import arrowLeft from "./../../images/arrow-left.svg";

type PaginationPropsType = {
  currentPage: number;
  totalPage: number;
  className?: string;
  setPageNumber?: (pageNumber: number) => void;
  direction: "rtl" | "ltr";
};

const Pagination: React.FC<PaginationPropsType> = ({
  currentPage,
  totalPage,
  className,
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
      {Number(currentPage) > 0 ? (
        <div
          className={`paginationParent select-none ${className ? className : ""}`}
          style={{ direction: `${direction}` }}
        >
          <div
            key={"prev"}
            onClick={() => {
              if (currentPage !== 1) {
                setPageNumberFunc(currentPage - 1);
              }
            }}
            className={`prev ${Number(currentPage) === 1 ? "disable" : ""}`}
          >
            {direction === "rtl" ? (
              <img src={arrowRight} alt="arrow right" />
            ) : (
              <img src={arrowLeft} alt="arrow left" />
            )}
          </div>
          {Number(totalPage) > 0 ? (
            <>
              {Number(totalPage) === 1 ? (
                <div
                  key={1}
                  className={`paginationNumber ${Number(currentPage) === 1 ? "currentPage" : ""}`}
                >
                  1
                </div>
              ) : totalPage === 2 ? (
                <>
                  <div
                    key={1}
                    onClick={() => setPageNumberFunc(1)}
                    className={`paginationNumber ${Number(currentPage) === 1 ? "currentPage" : ""}`}
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
                    key={Number(totalPage) + 5}
                    className={`paginationNumber betweenPages`}
                  >
                    ...
                  </div>
                  <div
                    key={Number(totalPage) - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {Number(totalPage) - 1}
                  </div>
                  <div
                    key={Number(totalPage)}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {Number(totalPage)}
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
                    key={Number(totalPage) + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={Number(totalPage) - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {Number(totalPage) - 1}
                  </div>
                  <div
                    key={Number(totalPage)}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {Number(totalPage)}
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
                    key={Number(totalPage) + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={Number(totalPage) - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {Number(totalPage) - 1}
                  </div>
                  <div
                    key={Number(totalPage)}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {Number(totalPage)}
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
                    key={Number(totalPage) + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={Number(totalPage) - 3}
                    onClick={() => setPageNumberFunc(totalPage - 3)}
                    className="paginationNumber"
                  >
                    {Number(totalPage) - 3}
                  </div>
                  <div
                    key={Number(totalPage) - 2}
                    onClick={() => setPageNumberFunc(totalPage - 2)}
                    className="paginationNumber currentPage"
                  >
                    {Number(totalPage) - 2}
                  </div>
                  <div
                    key={Number(totalPage) - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className={`paginationNumber `}
                  >
                    {Number(totalPage) - 1}
                  </div>
                  <div
                    key={Number(totalPage)}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {Number(totalPage)}
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
                    key={Number(totalPage) + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={Number(totalPage) - 2}
                    onClick={() => setPageNumberFunc(totalPage - 2)}
                    className="paginationNumber"
                  >
                    {Number(totalPage) - 2}
                  </div>
                  <div
                    key={Number(totalPage) - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber currentPage"
                  >
                    {Number(totalPage) - 1}
                  </div>
                  <div
                    key={Number(totalPage)}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {Number(totalPage)}
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
                    key={Number(totalPage) + 5}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={Number(totalPage) - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {Number(totalPage) - 1}
                  </div>
                  <div
                    key={Number(totalPage)}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber currentPage"
                  >
                    {Number(totalPage)}
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
                    key={Number(totalPage) + 1}
                    className="paginationNumber betweenPages"
                  >
                    ...
                  </div>
                  <div
                    key={Number(currentPage) - 1}
                    onClick={() => setPageNumberFunc(currentPage - 1)}
                    className="paginationNumber"
                  >
                    {Number(currentPage) - 1}
                  </div>
                  <div
                    key={Number(currentPage)}
                    onClick={() => setPageNumberFunc(currentPage)}
                    className="paginationNumber currentPage"
                  >
                    {Number(currentPage)}
                  </div>
                  <div
                    key={Number(currentPage) + 1}
                    onClick={() => setPageNumberFunc(currentPage + 1)}
                    className="paginationNumber"
                  >
                    {Number(currentPage) + 1}
                  </div>
                  {Number(currentPage) !== totalPage - 3 ? (
                    <div
                      key={Number(totalPage) + 2}
                      className="paginationNumber betweenPages"
                    >
                      ...
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    key={Number(totalPage) - 1}
                    onClick={() => setPageNumberFunc(totalPage - 1)}
                    className="paginationNumber"
                  >
                    {Number(totalPage) - 1}
                  </div>
                  <div
                    key={Number(totalPage)}
                    onClick={() => setPageNumberFunc(totalPage)}
                    className="paginationNumber"
                  >
                    {Number(totalPage)}
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
            className={`next ${Number(currentPage) === totalPage ? "disable" : ""}`}
          >
            {direction === "rtl" ? (
              <img src={arrowLeft} alt="arrow left" />
            ) : (
              <img src={arrowRight} alt="arrow right" />
            )}
          </div>
          {/* Go to page input */}
          <div className="paginationGotoBox">
            <input
              type="number"
              min={1}
              max={totalPage}
              placeholder="رفتن به صفحه"
              className="paginationGotoInput"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = Number((e.target as HTMLInputElement).value);
                  if (val > 0 && val <= totalPage) setPageNumberFunc(val);
                }
              }}
            />
            <button
              type="button"
              className="paginationGotoButton"
              onClick={(e) => {
                const input = e.currentTarget
                  .previousElementSibling as HTMLInputElement;
                const val = Number(input.value);
                if (val > 0 && val <= totalPage) setPageNumberFunc(val);
              }}
            >
              برو
            </button>
          </div>
          {/* End go to page input */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Pagination;
