import React from 'react'

import classes from './Input.module.css'

const input = (props) => {
    let inputClasses = [classes.inputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.invalid);
    }

    let inputElement;
    switch (props.inputType) {
        case 'input':
            inputElement =
                <input onChange={props.changed} className={inputClasses.join(' ')}
                       value={props.value} {...props.inputConfig}/>;
            break;
        case 'textarea':
            inputElement =
                <textarea onChange={props.changed}
                          className={inputClasses.join(' ')} {...props.inputConfig}>{props.value}</textarea>;
            break;
        case 'select':
            inputElement = (
                <select className={inputClasses.join(' ')} onChange={props.changed} name={props.inputConfig.name}
                        value={props.value}>
                    {
                        props.inputConfig.options.map((option, i) =>
                            (
                                <option key={i} name={option.name}>{option.displayName}</option>
                            )
                        )
                    }
                </select>
            );
            break;
        default:
            inputElement =
                <input onChange={props.changed} className={inputClasses.join(' ')}
                       value={props.value} {...props.inputConfig}/>
    }
    return (
        <div className={classes.input}>
            <label className={classes.label}></label>
            {inputElement}
        </div>
    )
};

export default input