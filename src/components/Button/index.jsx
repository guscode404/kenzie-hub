import style from "./style.module.scss";

export const Button = ({children, color, type, onClick}) => {
    return (
        <button onClick={onClick} type={type} className={style[`${color}`]}>{children}</button>
    )
}