import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export default function DeleteBtn(props) {
  return (
    <span className="delete-btn" {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export function EditBtn(props) {
  return (
    <button className="edit-btn" {...props} role="button" tabIndex="0">
      <img src="https://img.icons8.com/wired/64/000000/edit.png"/>
    </button>
  )
}
