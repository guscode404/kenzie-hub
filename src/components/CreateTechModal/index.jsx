import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { Form } from "../Form";
import { Input } from "../Input";
import { Select } from "../Select";
import { useTechContext } from "../../providers/TechContext";
import style from "./style.module.scss";

export const CreateTechModal = ({toggleModal}) => {
    const { register, handleSubmit } = useForm();
    const { addTech } = useTechContext();

    return (
        <div role="dialog" className={style["modal-base"]}>
            <div className={style["modal-content"]}>
                <div className={style["modal-header"]}>
                    <h2>Cadastrar Tecnologia</h2>
                    <button onClick={toggleModal}>X</button>
                </div>
                <Form onSubmit={handleSubmit(addTech)}>
                    <Input label="Nome" placeholder="Material UI" {...register("title")} />
                    <Select label="Selecionar status" {...register("status")}>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </Select>
                    <Button color="primary" type="submit">Cadastrar Tecnologia</Button>
                </Form>
            </div>
        </div>
    )
}