import React from "react";
import { useSettings } from "../../Hook/useSettings";
import { v4 as uuid } from "uuid";

const CustomSelect = () => {
  const {
    isOpen,
    setSelectedOption,
    selectedOption,
    toggleOptions,
    handleLang,
    options,
  } = useSettings();

  const selectOptions = (option) => {
    setSelectedOption(option);
    handleLang(option.value);
    toggleOptions();
  };

  return (
    <div style={{ width: "30px" }} onClick={toggleOptions}>
      <div className="selected-option"> {selectedOption.icon}</div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={uuid()}
              className="option"
              onClick={() => selectOptions(option)}
            >
              {option.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
