import style from "./style.module.scss";

export const TechList = ({children}) => {
    return (
        <ul className={style["tech-list"]}>
            {children}
        </ul>
    )
}