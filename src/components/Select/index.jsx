import { forwardRef } from "react";
import style from "./style.module.scss";

export const Select = forwardRef(({children, label, ...rest}, ref) => {
    return (
        <div className={style["select-container"]}>
            <label>{label}</label>
            <select {...rest} ref={ref}>
                {children}
            </select>
        </div>
    )
})