import React from "react";
import DeleteIcon from "../../resources/images/delete-icon.svg";

interface IButtonProps {
  onClick: () => void;
}

const RemoveButton: React.FC<IButtonProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="delete-button">
      <img src={DeleteIcon} alt="delete field" />
    </button>
  );
};

export default RemoveButton;
