import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import ErrorField from '../../components/ErrorField';
import appLogo from '../../assets/img/applogo.png'
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {};

interface DataForm {
	email: string,
	password: string
}

const Login: React.FC<Props> = () => {

    const navigate = useNavigate()

    const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<DataForm>({ criteriaMode: "all" });

	const onSubmitForm: SubmitHandler<DataForm> = (data) => {
		console.log(data)
		
		navigate('/dashboard', {replace: true})
	}


    return (
        <>
            <div className="h-full flex flex-col justify-center items-center space-y-8">

                <LazyLoadImage effect='blur' src={appLogo} className='w-20 h-20 mx-auto' />

                <div className='text-center'>
                    <h1 className="text-2xl md:text-3xl font-extrabold">Sign in to your account</h1>
                    <p className="mt-5">Start your demo version</p>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 px-2 md:px-0 w-11/12 md:w-7/12">
                    <div>
                        <label className="font-semibold" htmlFor="email-address">Email address</label>
                        <input id="email-address" type="text" autoComplete="email" className="text-input"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address."
                                }
                            })} />
                        <ErrorField errors={errors} name='email' />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="password">Password</label>
                        <input id="password" type="password" autoComplete="current-password" className="text-input"
                            {...register("password", {
                                required: "Password is required.",
                                minLength: { value: 5, message: "Password must exceed 4 characters." }
                            })} />
                        <ErrorField errors={errors} name='password' />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block font-medium cursor-pointer">Remember me</label>
                        </div>
                        <div className="flex items-center text-primary hover:text-primary">
                            <i className="ri-lock-fill text-base"></i>
                            <a href="#" className="font-medium ml-1">Forgot your password?</a>
                        </div>
                    </div>

                    <button type='submit' className="btn-submit" >
                        Sign In
                    </button>

                </form>

                <div className='font-medium text-sm flex items-center justify-center'>
                    <p>Don't have an account?</p>
                    <Link to='/auth/sign-up' className='text-primary ml-1'>Sign up</Link>
                </div>

            </div>
        </>
    );
}

export default Login;