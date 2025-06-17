import React from 'react';

type Props = {
  item: { id: number; selected: boolean };
  checked: boolean;
  onChange: () => void;
  draggableProps: any;
  dragHandleProps: any;
};

const ItemRow = React.forwardRef<HTMLDivElement, Props>(
  ({ item, checked, onChange, draggableProps, dragHandleProps }, ref) => {
    const checkboxId = `checkbox-${item.id}`;

    return (
      <div
        ref={ref}
        {...draggableProps}
        {...dragHandleProps}
        className="d-flex align-items-center gap-3 bg-white shadow-sm p-3 mb-2 rounded border"
      >
        <div className="form-check m-0">
          <input
            className="form-check-input"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id={checkboxId}
          />
          <label className="form-check-label" htmlFor={checkboxId}>
            {item.id}
          </label>
        </div>
      </div>
    );
  }
);

export default ItemRow;
