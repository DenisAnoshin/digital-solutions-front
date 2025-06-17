import React from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Поиск..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
