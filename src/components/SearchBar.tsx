import React from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      placeholder="🔍 Поиск..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
