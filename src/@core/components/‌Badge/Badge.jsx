import React from "react";

function Badge({ innerHtml, status }) {
  return (
    <>
      {status == "Active" && (
        <span
          className="text-capitalize badge bg-light-success rounded-pill"
          style={{
            textAlign: "center",
            borderRadius: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "12px",
            fontWeight: "lighter",
          }}
        >
          {innerHtml}
        </span>
      )}
      {status == "inActive" && (
        <span
          className="text-capitalize badge bg-light-danger rounded-pill"
          style={{
            textAlign: "center",
            borderRadius: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "12px",
            fontWeight: "lighter",
          }}
        >
          {innerHtml}
        </span>
      )}
    </>
  );
}

export default Badge;
