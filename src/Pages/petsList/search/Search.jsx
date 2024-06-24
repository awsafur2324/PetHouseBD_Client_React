import { useState, useEffect, useRef } from "react";
import { Input, Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import "./Custom.css"; // Import custom CSS

const SearchComponent = ({ options , setSearch}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowOptions(false);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="custom-dropdown-container relative flex w-full max-w-72 md:max-w-[24rem] "
      ref={inputRef}
    >
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowOptions(true)}
        className="custom-dropdown-input pr-20"
        label="Search by pet name"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={inputValue ? "gray" : "blue-gray"}
        onClick={() => setSearch(inputValue)}
        className="!absolute right-1 top-1 rounded"
      >
        Search
      </Button>
      {showOptions && inputValue && (
        <ul className="custom-dropdown-list dark:bg-[#1a1a1a] dark:text-white">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="custom-dropdown-option dark:hover:bg-[#ffffff1e]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
SearchComponent.propTypes = {
  options: PropTypes.any,
  setSearch : PropTypes.any
};
export default SearchComponent;
