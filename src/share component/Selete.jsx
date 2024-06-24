import CreatableSelect from "react-select/creatable";
import PropTypes from "prop-types";
const Seclet = ({ field, form, options, ...props }) => {
  const handleChange = (selectedOption) => {
    form.setFieldValue(field.name, selectedOption);
  };

  return (
    <CreatableSelect
      {...field}
      {...props}
      options={options}
      isClearable
      value={form.values[field.name]}
      onChange={handleChange}
      onBlur={() => form.setFieldTouched(field.name, true)}
      className="rounded-lg"
    />
  );
};
Seclet.propTypes = {
  field: PropTypes.any,
  form: PropTypes.any,
  options: PropTypes.any,
};
export default Seclet;
