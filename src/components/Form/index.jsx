import style from "./style.module.scss";

export const Form = ({children, ...rest}) => {
    return (
        <form {...rest} noValidate className={style["form"]}>
            {children}
        </form>
    )
}