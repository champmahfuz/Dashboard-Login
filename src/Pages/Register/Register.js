/* import { Button } from '@mui/material';
import React from 'react';
import { Container } from "react-bootstrap";
import styles from './Register.module.css';

import { Link } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';

const Register = () => {
    return (
        <>
            <Navbar />
            <Container className={`${'my-5'} ${styles.body1}`}>
                <div className={`${styles.registerContainer}`}>
                    <div className={`${styles.registerBox}`}>
                        <div className={`${styles.left1}`}></div>
                        <div className={`${styles.right1}`}>
                            <h2>Register</h2>
                            <input type="email" className={`${styles.field}`} placeholder="Your Name " />
                            <input type="email" className={`${styles.field}`} placeholder="Your Email " />
                            <p>We'll never share your email with anyone else.</p>
                            <input type="password" className={`${styles.field}`} placeholder="Password" />
                            <input type="password" className={`${styles.field}`} placeholder="Re-type your Password" />
                            <Button variant="contained" color="success">Register</Button>
                            <br />
                            <br />
                            <Link to="/login"><Button variant="text" className={`${styles.linkButton}`}>
                                Already Register?Please Login
                            </Button></Link>
                            <hr />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Register; */

import { Button } from '@mui/material';
import { Container } from "react-bootstrap";
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react';
import styles from '../Login/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Navbar from '../Shared/Navbar/Navbar';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading/Loading';

const Register = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    let signInError;

    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }

    if (user || gUser) {
        console.log(user || gUser);
    }

    const onSubmit = async data => {
        // console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log('update');
        navigate('/adminDashboard');
    }


    return (
        <>
            <Navbar />
            <Container className={`${'my-5'} ${styles.body1}`}>
                <div className={`${styles.loginContainer}`}>
                    <div className={`${styles.loginBox}`}>
                        <div className={`${styles.left1}`}></div>
                        <div className={`${styles.right1}`}>
                            <h2> <button className="btn btn-ghost">Register</button></h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is required'
                                        }
                                    })}
                                    type="text" className={`${styles.field}`} placeholder="Name" />

                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                                {/* Email */}
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
                                <Button type="submit" value='Login' variant="contained" color="success">Register</Button>

                            </form>
                            <br />
                            <Button
                                onClick={() => signInWithGoogle()}
                                variant="contained" startIcon={<GoogleIcon />}>
                                Google SignIn
                            </Button>
                            <br />
                            <br />
                            <Link to="/login"><Button variant="text" className={`${styles.linkButton}`}>
                                Already register?Please Login
                            </Button></Link>
                            <hr />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Register;