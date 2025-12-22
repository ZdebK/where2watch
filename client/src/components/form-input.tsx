import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> {
  label: string;
  error?: string;
  required?: boolean;
}

interface FormTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'> {
  label: string;
  error?: string;
  required?: boolean;
}

interface FormSelectProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'className' | 'style'> {
  label: string;
  error?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
}

export function FormInput({ label, error, required, ...props }: FormInputProps) {
  const inputId = props.id || label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className="formGroup">
      <label className={`formLabel ${required ? 'required' : ''}`} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className={`formField formInput ${error ? 'error' : ''}`}
      />
      {error && <span className="formError">{error}</span>}
    </div>
  );
}

export function FormTextarea({ label, error, required, ...props }: FormTextareaProps) {
  const textareaId = props.id || label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className="formGroup">
      <label className={`formLabel ${required ? 'required' : ''}`} htmlFor={textareaId}>
        {label}
      </label>
      <textarea
        id={textareaId}
        {...props}
        className={`formField formTextarea ${error ? 'error' : ''}`}
      />
      {error && <span className="formError">{error}</span>}
    </div>
  );
}

export function FormSelect({ label, error, required, options, ...props }: FormSelectProps) {
  const selectId = props.id || label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className="formGroup">
      <label className={`formLabel ${required ? 'required' : ''}`} htmlFor={selectId}>
        {label}
      </label>
      <select
        id={selectId}
        {...props}
        className={`formField formSelect ${error ? 'error' : ''}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="formError">{error}</span>}
    </div>
  );
}
