import { Button } from '@mui/material';
import { Container } from "react-bootstrap";
import GoogleIcon from '@mui/icons-material/Google';
import React, { useEffect } from 'react';
import styles from './Login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Navbar from '../Shared/Navbar/Navbar';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading/Loading';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (user || gUser) {
            // console.log(user || gUser);
            navigate(from, { replace: true });
        }
    }, [user, gUser, from, navigate])

    if (loading || gLoading) {
        return <Loading></Loading>
    }

    if (error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }



    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password);
    }
    return (
        <>
            <Navbar />
            <Container className={`${'my-5'} ${styles.body1}`}>
                <div className={`${styles.loginContainer}`}>
                    <div className={`${styles.loginBox}`}>
                        <div className={`${styles.left1}`}></div>
                        <div className={`${styles.right1}`}>
                            <h2> <button className="btn btn-ghost">LogIn</button></h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                    type="email" className={`${styles.field}`} placeholder="Your Email " />

                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>

                                {/* password */}
                                <input
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                                    type="password" className={`${styles.field}`} placeholder="Your Password " />

                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                                {signInError}
                                <Button type="submit" value='Login' variant="contained" color="success">LogIn</Button>

                            </form>
                            <br />
                            <Button
                                onClick={() => signInWithGoogle()}
                                variant="contained" startIcon={<GoogleIcon />}>
                                Google SignIn
                            </Button>
                            <br />
                            <br />
                            <Link to="/register"><Button variant="text" className={`${styles.linkButton}`}>
                                New User? Register Here
                            </Button></Link>
                            <hr />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Login;