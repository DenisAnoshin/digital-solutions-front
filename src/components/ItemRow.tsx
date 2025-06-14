import React from "react";

type Props = {
  item: number;
  checked: boolean;
  onChange: () => void;
  draggableProps: any;
  dragHandleProps: any;
};

const ItemRow = React.forwardRef<HTMLDivElement, Props>(
  ({ item, checked, onChange, draggableProps, dragHandleProps }, ref) => {
    return (
      <div
        ref={ref}
        {...draggableProps}
        {...dragHandleProps}
        className="flex items-center gap-4 bg-white shadow-sm hover:shadow-md transition p-2 mb-2 rounded"
      >
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span>{item}</span>
      </div>
    );
  }
);

export default ItemRow;
