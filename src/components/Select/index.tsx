import React from "react";
import "./style.css";

interface IOption {
    value: any;
    label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: IOption[];
}
const Select = (
    props: SelectProps
) => {
    const { options, ...rest } = props;
    return (
        <select className="Select" {...rest} >
            {options.map((option: IOption, index: number) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
