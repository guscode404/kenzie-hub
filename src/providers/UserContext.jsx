import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [techList, setTechList] = useState([]);

    const loginUser = async (formData) => {
        try {
            const { data } = await api.post("/sessions", formData);
            setUser(data.user);
            setTechList(data.user.techs);
            localStorage.setItem("@TOKEN", data.token);

            toast.success("Login realizado! Redirecionando para o dashboard...", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });


            setTimeout(() => navigate("/dashboard"), 1500);;
        } catch (error) {
            toast.error("Ops! Algo deu errado.", {
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

    const registerUser = async (formData) => {
        try {
            const request = await api.post("/users", formData);
            
            toast.success("Conta criada com sucesso!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
                
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            toast.error("Ops! Algo deu errado.", {
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

    const logout = () => {
        setUser(null);
        localStorage.removeItem("@TOKEN");
        navigate("/");
    }

    useEffect(() => {
        const autoLogin = async () => {
            const token = localStorage.getItem("@TOKEN");

            if(token) {
                try {
                    const { data } = await api.get("/profile", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
    
                    setUser(data);
                    navigate("/dashboard");
                } catch (error) {
                    localStorage.removeItem("@TOKEN");
                }
            }
        }

        autoLogin();
    }, [])

    return (
        <UserContext.Provider value={{user, setUser, loginUser, registerUser, logout, techList, setTechList}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);