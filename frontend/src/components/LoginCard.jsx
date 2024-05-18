import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginCard({ data, setData, error, setError, isLogin }) {

    // const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        // axios.post("https://paytm-basic-clone-backend.vercel.app/api/v1/user/signin", loginData)
        //     .then((data) => {
        //         const authorization = data.data.token;
        //         localStorage.setItem('authorization', authorization);

        //         setData(
        //             () => ({
        //                 firstName: data.data.firstName,
        //                 lastName: data.data.lastName,
        //                 userId: data.data.userId,
        //                 balance: data.data.balance
        //             })
        //         )
        //         navigate("/dashboard")
        //     }).catch((error) => {
        //         console.log("error is =>", error)
        //         setError(error.response.data.message)
        //         console.log(error.response.data.message)
        //     })
        console.log(data)
    }

    function changeForm(e) {
        if (error) {
            setError("")
        }
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div className="flex items-center justify-center w-[300px] md:w-[700px] bg-black bg-opacity-40 md:px-4 rounded-lg shadow-2xl">
            <div className="bg-transparent p-2 px-4 md:p-8 rounded-3xl shadow-lg w-[600px] ">
                <h2 className="text-2xl md:text-3xl font-medium mb-2 md:mb-4 text-white">{isLogin ? "Sign In" : "Sign Up"}</h2>
                <form onSubmit={sendData}>
                    <div className='flex flex-col md:flex-row gap-2 md:gap-5 md:justify-between '>
                        <div className=" mb-1 md:mb-4 w-full">
                            <label className="block text-white mb-1 md:mb-2" htmlFor="email">
                                Email
                            </label>
                            <div className="flex items-center bg-gray-800 p-1 md:p-2 rounded-md">
                                <input
                                    className="bg-transparent border-none focus:outline-none focus:ring-0 text-white w-full ml-2"
                                    type="email"
                                    id="email"
                                    name='email'
                                    placeholder="Enter your email address"
                                    onChange={changeForm}
                                />
                            </div>
                        </div>
                        <div className="mb-2 md:mb-4 w-full">
                            <label className="block text-white mb-1 md:mb-2 cursor-pointer" htmlFor="password">
                                Password
                            </label>
                            <div className="flex items-center bg-gray-800 p-1 md:p-2 rounded-md">
                                <input
                                    className="bg-transparent border-none focus:outline-none focus:ring-0 text-white w-full ml-2"
                                    type="password"
                                    id="password"
                                    name='password'
                                    placeholder="Enter your password"
                                    onChange={changeForm}
                                />
                            </div>
                        </div>
                    </div>
                    {!isLogin && (
                        <div className='flex flex-col  md:flex-row gap-2 md:gap-5'>
                            <div className="mb-2 md:mb-4 w-full">
                                <label className="block text-white mb-1 md:mb-2 cursor-pointer" htmlFor="firstName">
                                    First name
                                </label>
                                <div className="flex items-center bg-gray-800 p-1 md:p-2 rounded-md">
                                    <input
                                        className="bg-transparent border-none focus:outline-none focus:ring-0 text-white w-full ml-2"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        onChange={changeForm}
                                    />
                                </div>
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block text-white mb-1 md:mb-2 cursor-pointer" htmlFor="lastName">
                                    Last name
                                </label>
                                <div className="flex items-center bg-gray-800 p-1 md:p-2 rounded-md">
                                    <input
                                        className="bg-transparent border-none focus:outline-none focus:ring-0 text-white w-full ml-2"
                                        type="text"
                                        id="lastName"
                                        name='lastName'
                                        placeholder="Enter your last name"
                                        onChange={changeForm}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white py-1 md:py-2 rounded-md font-semibold hover:bg-pink-600 transition duration-200"
                    >
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                    <p className="md:mb-4 text-white mt-3">
                        {isLogin ? "If you do not have an account, you can " : "If you already have an account, you can "}
                        <a href="/login" className="text-purple-200 font-semibold">
                            {isLogin ? "Sign Up here!" : "Sign In here!"}
                        </a>
                    </p>
                    {error && error.map((e, index) => (
                        <div key={index} className='text-red-600'>{e}</div>
                    ))}
                </form>
            </div>
        </div>
    );
}

export default LoginCard;
