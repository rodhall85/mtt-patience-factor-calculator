const NumberField = ({value, handleChange, name}) => {
    const handleFocus = (e) => {
        e.target.select();
    };

    return (
        <input
            className="text-center border-2 rounded-lg py-2"
            type="text"
            value={value}
            onChange={handleChange}
            name={name}
            onFocus={handleFocus}
        />
    );
};

export default NumberField;
