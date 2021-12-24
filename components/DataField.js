const DataField = ({value, handleChange, handleBlur, name, type = "text"}) => {
    const handleFocus = (e) => {
        e.target.select();
    };

    return (
        <input
            className="text-center border-2 rounded-lg py-2"
            type={type}
            value={value}
            onChange={handleChange}
            name={name}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
};

export default DataField;
