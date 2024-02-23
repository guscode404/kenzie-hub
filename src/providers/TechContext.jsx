import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const TechContext = createContext({});

export const TechProvider = ({children}) => {
    const { techList, setTechList } = useUserContext();
    const [editingTech, setEditingTech] = useState(null);
    const token = localStorage.getItem("@TOKEN")

    useEffect(() => {
        const getTechs = async () => {
            const { data } = await api.get("/profile", {  
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setTechList(data.techs);
        }

        getTechs();
    }, []);

    const addTech = async (formData) => {
        try {
            const newTech = {title: formData.title, status: formData.status};

            const { data } = await api.post("/users/techs/", newTech, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            
            })

            setTechList([...techList, {...newTech, id: data.id}]);

            toast.success("Tecnologia adicionada com sucesso!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            if(error.response.status === 401) {
                toast.error("Ops! Parece que já existe uma nota com este nome!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast.error("As tecnologias precisam ter um nome!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    }

    const deleteTech = async (targetTech) => {
        try {
            const newList = techList.filter((tech) => targetTech.id !== tech.id);
            setTechList(newList);

            await api.delete(`/users/techs/${targetTech.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const editTech = async (formData) => {
        const editedTech = {...formData}

        try {
            const { data } = await api.put(`/users/techs/${editingTech.id}`, editedTech, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            const newTechs = techList.map((tech) => {
                return tech.id === editingTech.id ? {title: data.title, status: data.status, id: data.id} : tech;
            })
            
            setTechList(newTechs);

            toast.success("Tecnologia atualizada com sucesso!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TechContext.Provider value={{addTech, deleteTech, editTech, editingTech, setEditingTech}}>
            {children}
        </TechContext.Provider>
    )
}

export const useTechContext = () => useContext(TechContext);