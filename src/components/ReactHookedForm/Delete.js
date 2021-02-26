import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Delete(props) {
  const { maxIndex, removeHandler, index } = props;

  return (
    <div>
      {maxIndex > 1 && index + 1 < maxIndex && (
        <DeleteIcon
          color="primary"
          onClick={() => {
            if (maxIndex > 1) {
              removeHandler(index);
            }
          }}
          style={{ fontSize: "1.8em" }}
        />
      )}
    </div>
  );
}
