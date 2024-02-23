import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginSchema";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useUserContext } from "../../providers/UserContext";
import "react-toastify/dist/ReactToastify.css";
import style from "./style.module.scss";

export const LoginPage = () => {
    const { loginUser, setUser } = useUserContext();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    return(
        <section className={style["login-section"]}>
            <Logo />
            <Form onSubmit={handleSubmit(loginUser)}>
                <h2>Login</h2>

                <Input label="Email" placeholder="Digite aqui seu email" type="email" {...register("email")}/>
                {errors.email ? <small>{errors.email.message}</small> : null}

                <Input label="Senha" placeholder="Digite aqui sua senha" type="password" {...register("password")}/>
                {errors.password ? <small>{errors.password.message}</small> : null}
                
                <Button type="submit" color="primary">Entrar</Button>
                
                <div className={style["register-container"]}>
                    <span>Ainda não possui uma conta?</span>
                    <Link to="/register">
                        <Button type="button" color="deactivated">Cadastre-se</Button>
                    </Link>
                </div>
            </Form>

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
        </section>
    )
}