import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTechContext } from '../../../providers/TechContext';
import style from "./style.module.scss";

export const TechCard = ({toggleEditModal, tech}) => {
    const { deleteTech, setEditingTech } = useTechContext();

    return (
        <li className={style["tech"]}>
            <h4>{tech.title}</h4>
            <div className={style["tech-info"]}>
                <span>{tech.status}</span>
                <div>
                    <button onClick={() => setEditingTech(tech)}><FontAwesomeIcon icon={faPen} onClick={toggleEditModal} /></button>
                    <button onClick={() => deleteTech(tech)}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
        </li>
    )
}