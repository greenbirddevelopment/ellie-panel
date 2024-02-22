const Button = ({ type, variant, className, onClick, children, disabled }) => {
  let classes = `font-semibold px-5 py-2 rounded shadow transition ${className} `;

  switch (variant) {
    case "primary":
      classes += `bg-primary ${
        !disabled && "hover:bg-primary-dark"
      } text-white`;
      break;

    case "light":
      classes += `bg-light ${!disabled && "hover:bg-light-dark"} text-dark`;
      break;

    case "dark":
      classes += `bg-dark ${!disabled && "hover:bg-black"} text-white`;
      break;

    case "link":
      classes += `text-primary ${
        !disabled && "hover:text-primary-dark"
      } shadow-none px-0 py-0`;
      break;

    default:
      classes += `bg-primary ${
        !disabled && "hover:bg-primary-dark"
      } text-white`;
      break;
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
