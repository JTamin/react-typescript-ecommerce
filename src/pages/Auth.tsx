import '../App.css'
import { useForm, type SubmitHandler } from "react-hook-form"
import { authContext } from '../context/authContext';
import { useNavigate } from 'react-router';
import { useState } from 'react';
type Auth = {
    email: string,
    password: string
}

const Auth = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<Auth>()

    const { registerUser, user, getCurrentUser } = authContext();

    const navigate = useNavigate()
    const [authMessage, setAuthMessage] = useState<string>("")

    const [authStatus, setAuthStatus] = useState<boolean>(true)

    const onSubmit: SubmitHandler<Auth> = ({ email, password }: { email: string, password: string }) => {
        const newUser = {
            email, password
        }

        if (!authStatus) {
            const existingAccount = user?.some(item => item.email === email)

            if (existingAccount) {
                setAuthMessage('email already existed')
                return
            }
            registerUser(newUser)
            getCurrentUser(newUser);
            navigate('/')
            return
        }
        if (!user) {
            console.log('no user')
            return
        }
        const hasAccount = user.find(item => item.email === email && item.password === password)
        if (!hasAccount) {
            setAuthMessage("wrong email or password");
            return
        }
        const currentUser = {
            email: hasAccount?.email,
            password: hasAccount?.password
        }
        setAuthStatus(true)
        getCurrentUser(currentUser);
        navigate('/')
    }
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">{authStatus ? 'Login' : 'Signup'}</h2>
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <p style={{ color: "red" }}>{authMessage}</p>
                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="Enter your email"
                            {...register("email",
                                {
                                    required: "This field is required",
                                }
                            )}
                        />
                        {errors.email?.message && <p style={{ color: "red" }}>{errors.email.message}</p>}

                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input
                            type="password"
                            className="auth-input"
                            placeholder="Enter your password"
                            {...register('password',
                                {
                                    required: "This field is required",
                                    minLength: {
                                        value: 5,
                                        message: "Min length is 6"
                                    },
                                    maxLength: {
                                        value: 8,
                                        message: "Max length is 8"
                                    },
                                }
                            )}
                        />
                        {errors.password?.message && <p style={{ color: "red" }}>{errors.password.message}</p>}
                    </div>

                    <button className="auth-button" type="submit">
                        {authStatus ? 'Login' : 'Signup'}
                    </button>

                </form>

                <p className="auth-footer" onClick={() => setAuthStatus(prev => !prev)}>
                    Don't have an account? <span className="auth-link">Register</span>
                </p>

            </div>
        </div>
    );
};

export default Auth;