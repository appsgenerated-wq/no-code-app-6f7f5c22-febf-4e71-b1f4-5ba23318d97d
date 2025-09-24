import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, icon, id, autoComplete, noMargin = false, className = '' }) => {
  const marginClass = noMargin ? '' : 'mb-4';
  return (
    <div className={`${marginClass} ${className}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative rounded-md shadow-sm">
        {icon && <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</div>}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
};

export default Input;