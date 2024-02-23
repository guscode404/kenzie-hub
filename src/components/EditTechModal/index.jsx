import { useForm } from "react-hook-form";
import { useTechContext } from "../../providers/TechContext";
import { Button } from "../Button";
import { Form } from "../Form";
import { Input } from "../Input";
import { Select } from "../Select";
import style from "./style.module.scss";

export const EditTechModal = ({toggleModal}) => {
    const { register, handleSubmit } = useForm();
    const { editTech, editingTech } = useTechContext();

    return (
        <div role="dialog" className={style["modal-base"]}>
            <div className={style["modal-content"]}>
                <div className={style["modal-header"]}>
                    <h2>Tecnologia Detalhes</h2>
                    <button onClick={toggleModal}>X</button>
                </div>
                <Form onSubmit={handleSubmit(editTech)}>
                    <Input disabled label="Nome" value={editingTech.title} placeholder="Material UI" {...register("title")}/>
                    <Select label="Selecionar status" {...register("status")}>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </Select>
                    <Button color="primary" type="submit">Salvar alterações</Button>
                </Form>
            </div>
        </div>
    )
}