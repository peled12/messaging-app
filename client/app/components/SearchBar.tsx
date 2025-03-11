import React, { FC } from "react";

const SearchBar: FC<{ classname?: string }> = ({ classname }) => {
  return (
    <div className={`${classname} bg-white`}>
      <input type="text" />
    </div>
  );
};

export default SearchBar;
