import React, { useState } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface OptionProps {
  value: string;
  children: React.ReactNode;
  onClick?: (value: string) => void;
}

const Option: React.FC<OptionProps> = ({ value, children, onClick }) => (
  <div
    onClick={() => onClick && onClick(value)}
    className="px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
  >
    {children}
  </div>
);

const Select: React.FC<SelectProps> & { Option: React.FC<OptionProps> } = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 px-4 py-2 rounded-md w-full text-left"
      >
        {value || 'Select...'}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, {
              onClick: (value: string) => {
                onValueChange(value);
                setIsOpen(false);
              },
            })
          )}
        </div>
      )}
    </div>
  );
};

Select.Option = Option;

export { Select };
