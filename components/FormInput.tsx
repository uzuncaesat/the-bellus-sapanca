'use client';

import { useState, FocusEvent } from 'react';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function FormInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  rows = 4,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isFloating = focused || hasValue;

  const baseClasses = `
    w-full px-4 py-3 border rounded-xl transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-whatsapp focus:border-transparent
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${type === 'textarea' ? 'resize-none' : ''}
  `;

  return (
    <div className="relative">
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={baseClasses}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      )}
      <label
        htmlFor={id}
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${isFloating
            ? 'top-2 text-xs text-whatsapp font-medium'
            : 'top-3.5 text-base text-gray-500'
          }
        `}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
