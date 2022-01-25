import React, { useEffect, useState } from "react";
import { useCombobox } from "downshift";
import ReactCountryFlag from "react-country-flag";

export const CountrySelect = ({ countryCode = "us", className, onChange }) => {
  const [inputItems, setInputItems] = useState([]);
  const [data, setData] = useState([]);
  const [dataMap, setDataMap] = useState({});
  const [codeMap, setCodeMap] = useState({});

  useEffect(() => {
    // same as Fetch call
    import("constants/data.json").then((data) => {
      const dataDict = {};
      const codeDict = {};

      data.default.forEach((x) => {
        dataDict[x.value] = x.label;
        codeDict[x.label] = x.value;
      });
      const labels = data.default.map((x) => x.label);

      setInputItems(labels);
      setData(labels);
      setDataMap(dataDict);
      setCodeMap(codeDict);
    });
  }, []);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        data.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  useEffect(() => {
    const initialItem = dataMap[countryCode];

    if (initialItem) {
      selectItem(initialItem);
    }
  }, [dataMap]);

  useEffect(() => {
    onChange(selectedItem);
  }, [selectedItem]);

  return (
    <div className={className}>
      <div className="combobox" {...getComboboxProps()}>
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          <span>{selectedItem || "Select Country"}</span>
          <span>&#9660;</span>
        </button>

        <input {...getInputProps()} placeholder="Search" />
      </div>

      <ul
        {...getMenuProps()}
        style={{
          border: isOpen ? "1px solid rgb(191, 191, 191)" : "none",
        }}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>
                <ReactCountryFlag countryCode={codeMap[item]} />
              </span>

              <span>{item} </span>
            </li>
          ))}
      </ul>
    </div>
  );
};
