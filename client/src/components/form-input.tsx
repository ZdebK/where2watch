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
  return (
    <div>
      <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
        {label} {required && '*'}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2 rounded-lg outline-none transition-all"
        style={{
          backgroundColor: 'var(--w2w-deep-navy)',
          color: 'var(--w2w-pure-white)',
          border: `1px solid ${error ? 'var(--w2w-error)' : 'transparent'}`,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--w2w-orange)';
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderColor = 'transparent';
        }}
      />
      {error && (
        <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function FormTextarea({ label, error, required, ...props }: FormTextareaProps) {
  return (
    <div>
      <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
        {label} {required && '*'}
      </label>
      <textarea
        {...props}
        className="w-full px-4 py-2 rounded-lg outline-none transition-all resize-none"
        style={{
          backgroundColor: 'var(--w2w-deep-navy)',
          color: 'var(--w2w-pure-white)',
          border: `1px solid ${error ? 'var(--w2w-error)' : 'transparent'}`,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--w2w-orange)';
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderColor = 'transparent';
        }}
      />
      {error && (
        <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function FormSelect({ label, error, required, options, ...props }: FormSelectProps) {
  return (
    <div>
      <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
        {label} {required && '*'}
      </label>
      <select
        {...props}
        className="w-full px-4 py-2 rounded-lg outline-none transition-all"
        style={{
          backgroundColor: 'var(--w2w-deep-navy)',
          color: 'var(--w2w-pure-white)',
          border: `1px solid ${error ? 'var(--w2w-error)' : 'transparent'}`,
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
