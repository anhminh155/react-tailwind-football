import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import ErrorField from '../../components/ErrorField';
import appLogo from '../../assets/img/applogo.png'
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {};

interface DataForm {
    fullname: string,
	email: string,
	password: string
}

const Register: React.FC<Props> = () => {

    const navigate = useNavigate()

    const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<DataForm>({ criteriaMode: "all" });

	const onSubmitForm: SubmitHandler<DataForm> = (data) => {
		console.log(data)
		
		navigate('/auth', {replace: true})
	}


    return (
        <>
            <div className="h-full flex flex-col justify-center items-center space-y-6">

                <LazyLoadImage effect='blur' src={appLogo} className='w-20 h-20 mx-auto' />

                <div className='text-center'>
                    <h1 className="text-2xl md:text-3xl font-extrabold">Join our community</h1>
                    <p className="mt-5">Start your journey with our product</p>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5 px-2 md:px-0 w-11/12 md:w-7/12">
                    <div>
                        <label className="font-semibold" htmlFor="fullname">Fullname</label>
                        <input id="fullname" type="fullname" autoComplete="fullname" className="text-input"
                            {...register("fullname", { required: "Fullname is required."})} />
                        <ErrorField errors={errors} name='fullname' />
                    </div>
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
                    <div className='pb-3'>
                        <label className="font-semibold" htmlFor="password">Password</label>
                        <input id="password" type="password" autoComplete="password" className="text-input"
                            {...register("password", {
                                required: "Password is required.",
                                minLength: { value: 5, message: "Password must exceed 4 characters." }
                            })} />
                        <ErrorField errors={errors} name='password' />
                    </div>

                    <button type='submit' className="btn-submit" >Sign Up</button>
                    <button type='button' className="w-full border-1 border-soft rounded py-1.5 shadow font-medium flex items-center justify-center hover:border-none hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" >
                        <i className='ri-google-fill mr-2 text-2xl'></i>
                        <p>Sign in with Google</p>
                    </button>

                </form>

                <div className='font-medium text-sm flex items-center justify-center'>
                    <p>Already have an account?</p>
                    <Link to='/auth' className='text-primary ml-1'>Sign in</Link>
                </div>

            </div>
        </>
    );
}

export default Register;