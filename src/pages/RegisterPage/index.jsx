import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { Logo } from "../../components/Logo";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerSchema";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useUserContext } from "../../providers/UserContext";
import "react-toastify/dist/ReactToastify.css";
import style from "./style.module.scss";

export const RegisterPage = () => {
    const { registerUser } = useUserContext();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    });

    return(
        <section className={style["register-section"]}>
            <div>
                <Logo />
                <Link to="/"><Button color="exit">Voltar</Button></Link>
            </div>
            <Form onSubmit={handleSubmit(registerUser)}>
                <h2>Crie sua conta</h2>
                <span>Rápido e grátis, vamos nessa!</span>
                
                <Input label="Nome" placeholder="Digite aqui seu nome" type="text" {...register("name")}/>
                {errors.name ? <small>{errors.name.message}</small> : null}
               
                <Input label="Email" placeholder="Digite aqui seu email" type="email" {...register("email")}/>
                {errors.email ? <small>{errors.email.message}</small> : null}
                
                <Input label="Senha" placeholder="Digite aqui sua senha" type="password" {...register("password")}/>
                {errors.password ? <small>{errors.password.message}</small> : null}
                
                <Input label="Confirmar senha" placeholder="Confirme aqui sua senha" type="password" {...register("confirmPassword")}/>
                {errors.confirmPassword ? <small>{errors.confirmPassword.message}</small> : null}
                
                <Input label="Bio" placeholder="Fale sobre você" type="text" {...register("bio")}/>
                {errors.bio ? <small>{errors.bio.message}</small> : null}
                
                <Input label="Contato" placeholder="Opção de contato" type="text" {...register("contact")}/>
                {errors.contact ? <small>{errors.contact.message}</small> : null}
               
                <Select label="Selecionar módulo" {...register("course_module")}>
                    <option value="Primeiro módulo">Primeiro módulo</option>
                    <option value="Segundo módulo">Segundo módulo</option>
                    <option value="Terceiro módulo">Terceiro módulo</option>
                    <option value="Quarto módulo">Quarto módulo</option>
                    <option value="Quinto módulo">Quinto módulo</option>
                    <option value="Sexto módulo">Sexto módulo</option>
                </Select>

                <Button type="submit" color="negative">Cadastrar</Button>
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