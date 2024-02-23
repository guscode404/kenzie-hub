import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { useUserContext } from "../../providers/UserContext";
import { TechList } from "../../components/TechList";
import { TechCard } from "../../components/TechList/TechCard";
import { CreateTechModal } from "../../components/CreateTechModal";
import { useState } from "react";
import { EditTechModal } from "../../components/EditTechModal";
import { TechProvider } from "../../providers/TechContext";
import { ToastContainer } from "react-toastify";
import style from "./style.module.scss";

export const DashboardPage = () => {
    const { user, logout, techList } = useUserContext();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const toggleCreateModal = () => {
        setIsCreateOpen(!isCreateOpen);
    }

    const toggleEditModal = () => {
        setIsEditOpen(!isEditOpen);
    }

    return(
        <>
            <section className={style["dashboard-section"]}>
                <TechProvider>
                    <div className={style["menu"]}>
                        <Logo />
                        <Button color="exit" onClick={logout}>Sair</Button>
                    </div>
                    <hr />
                    <div className={style["welcome"]}>
                        <h2>Olá, {user.name}</h2>
                        <span>{user.course_module}</span>
                    </div>
                    <hr />
                    <div className={style["content"]}>
                        <div className={style["technologies-header"]}>
                            <h3>Tecnologias</h3>
                            <button onClick={toggleCreateModal}>+</button>
                        </div>
                        <TechList>
                            {techList.map((tech) => <TechCard key={tech.id} toggleEditModal={toggleEditModal} tech={tech} />)}
                        </TechList>
                    </div>

                    {isCreateOpen ? <CreateTechModal toggleModal={toggleCreateModal} /> : null}
                    {isEditOpen ? <EditTechModal toggleModal={toggleEditModal} /> : null}
                </TechProvider>
            </section>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}