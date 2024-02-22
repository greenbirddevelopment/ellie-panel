import FormGroup from "../form/FormGroup";

const Input = ({
  type,
  name,
  placeholder,
  className,
  value,
  onChange,
  onBlur,
  label,
  autoFocus,
  icon,
  iconPosition,
  isValid,
  ref,
}) => {
  let inputClasses = `form-input peer w-full border rounded shadow-sm border-gray-300 placeholder:text-white placeholder-opacity-0 focus:ring-0 focus:border-primary text-dark h-12 lg:h-14 transition ${className} `;
  let labelClasses =
    "peer absolute text-dark left-2 top-0 peer-focus:text-primary peer-placeholder-shown:text-dark peer-placeholder-shown:!top-1/2 -translate-y-1/2 peer-placeholder-shown:text-gray-500 bg-white peer-focus:!top-0 transition-all cursor-text px-1 ";
  let iconClasses = "absolute top-1/2 -translate-y-1/2 right-3 ";

  if (isValid) {
    inputClasses += "!text-danger !border-danger";
    labelClasses += "!text-danger";
  }

  if (iconPosition) {
    if (iconPosition === "left") {
      labelClasses += "left-10";
      iconClasses += "left-3";
    }
  }

  return (
    <FormGroup>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        autoComplete="off"
        ref={ref}
      />
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      {icon && <div className={iconClasses}>{icon}</div>}
    </FormGroup>
  );
};

export default Input;
