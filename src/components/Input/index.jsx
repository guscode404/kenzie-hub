import { forwardRef } from "react";
import style from "./style.module.scss";

export const Input = forwardRef(({label, placeholder, type, ...rest}, ref) => {
    return (
        <div className={style["input-container"]}>
            <label>{label}</label>
            <input placeholder={placeholder} type={type} {...rest} ref={ref}/>
        </div>
    )
})