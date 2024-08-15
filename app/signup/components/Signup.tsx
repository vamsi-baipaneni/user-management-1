"use client";
import React, { useState } from 'react'
import DatePicker from '@/app/components/DatePicker';
import { geography } from '@/app/misc/geography';
import PlanDetails from './PlanDetails';
import { form } from "@/app/misc/types"

const initialData: form = {
    first: "",
    last: "",
    middle: "",
    email: "",
    password: "",
    confirmpassword: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    plantype: "High",
    planperiod: "Monthly"
}

const SignupForm = () => {
    const [formData, setFormData] = useState<form>(initialData);
    const [errors, setErrors] = useState({});
    const [state, setState] = useState("");
    const [cities, setCities] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = {};
        const pwdRegex = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
        const emailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        const zipRegex = RegExp(/^\d+$/);
        if (!formData.first.trim()) {
            validationErrors.first = "Please enter a valid first name";
        }
        if (!formData.last.trim()) {
            validationErrors.last = "Please enter a valid last name"
        }
        if (!emailRegex.test(formData.email.toLocaleLowerCase()) || !formData.email.trim()) {
            validationErrors.email = "Please enter a valid email"
        }
        if (!pwdRegex.test(formData.password)) {
            validationErrors.password = "Please enter a valid password"
        }
        if (formData.password !== formData.confirmpassword) {
            validationErrors.confirmpassword = "Passwords dont match"
        }
        if (!formData.street.trim()) {
            validationErrors.street = "Please enter a street name"
        }
        if (!formData.state.trim()) {
            validationErrors.state = "Please enter a state name"
        }
        if (!formData.city.trim()) {
            validationErrors.city = "Please enter a city name"
        }
        if (!formData.zipcode.trim() || !zipRegex.test(formData.zipcode)) {
            validationErrors.zipcode = "Please enter a valid zipcode"
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log(formData);
            const data = { ...formData, created: new Date(), column: "default" };
            const existingData = JSON.parse(window.localStorage.getItem("userData") || "[]");
            existingData.push(data);
            window.localStorage.setItem("userData", JSON.stringify(existingData));
        }
    }
    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
        if(value===""){
            const msg = `${name} cannot be empty!!`
            setErrors({
                ...errors, [name]: msg
            })
        }
        else{
            let validationErrors = errors;
            if(validationErrors[name]){
                delete validationErrors[name];
            }
            setErrors(validationErrors);
        }
    }

    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setState(value);
        geography.forEach(location => {
            if (location.state === value) {
                setCities(location.cities);
            }
        })
        setFormData({
            ...formData, [name]: value
        });
        if(value===""){
            setErrors({
                ...errors, [name]: "State cannot be empty"
            })
        }
        else{
            let validationErrors = errors;
            if(validationErrors[name]){
                delete validationErrors[name];
            }
            setErrors(validationErrors);
        }
    }

    const handleToggle = (annual: boolean) => {
        if (annual) {
            setFormData({
                ...formData, ["planperiod"]: "Annual"
            })
        }
        else {
            setFormData({
                ...formData, ["planperiod"]: "Monthly"
            })
        }
    }

    const handlePlan = (plan: string) => {
        if (plan === "High") {
            setFormData({
                ...formData, ["plantype"]: plan
            })
        }
        else if (plan === "Medium") {
            setFormData({
                ...formData, ["plantype"]: plan
            })
        }
        else if (plan === "Low") {
            setFormData({
                ...formData, ["plantype"]: plan
            })
        }
    }

    return (
        <form className="inline-flex flex-col gap-5 justify-center" onSubmit={handleSubmit}>
            <h2 className='text-4xl text-white tracking-wide font-semibold'>Create an Account <p className='text-xs font-light'>(Fields marked with * are required)</p></h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className={`flex-1 relative mt-4 ${errors.first ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`}>
                    <input name='first' type="text" className='text-md w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer' onChange={handleFieldChange} />
                    <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.first ? "peer-valid:-translate-y-6": ""}`}>First Name (*)</span>
                    {errors.first && <span className='text-red-500'>{errors.first}</span>}
                </label>
                <label className={`flex-1 relative mt-4 ${errors.last ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`}>
                    <input name='last' type="text" className='text-md w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer' onChange={handleFieldChange} />
                    <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.last ? "peer-valid:-translate-y-6": ""}`}>Last Name (*)</span>
                    {errors.last && <span className='text-red-500'>{errors.last}</span>}
                </label>
                <label className={`flex-1 relative mt-4`}>
                    <input name='middle' type="text" className='text-md w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer' onChange={handleFieldChange} />
                    <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.middle ? "peer-valid:-translate-y-6": ""}`}>Middle Name</span>
                </label>
            </div>
            <label className={`flex-1 relative mt-4 ${errors.email ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`}>
                <input name='email' type="email" className='text-md w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer' onChange={handleFieldChange} />
                <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.email ? "peer-valid:-translate-y-6": ""}`}>Email (*)</span>
                {errors.email && <span className='text-red-500'>{errors.email}</span>}
            </label>
            <label className={`flex-1 relative mt-4 ${errors.password ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`}>
                <input name='password' type="password" className='text-md w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer' onChange={handleFieldChange} />
                <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.password ? "peer-valid:-translate-y-6": ""}`}>Password (*)</span>
                    {errors.password && <span className='text-red-500'>{errors.password}</span>}
            </label>
            <label className={`flex-1 relative mt-4 ${errors.confirmpassword ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`}>
                <input name='confirmpassword' type="password" className='text-md w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer' onChange={handleFieldChange} />
                <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.confirmpassword ? "peer-valid:-translate-y-6": ""}`}>Confirm Password (*)</span>
                {errors.confirmpassword && <span className='text-red-500'>{errors.confirmpassword}</span>}
            </label>
            <div className='flex flex-col md:flex-row justify-between gap-5'>
                <div className='md:w-[50%] mt-4'>
                    <label className={`flex-1 relative ${errors.street ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`}>
                        <input name='street' type="text" className='text-md w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer' onChange={handleFieldChange} />
                        <span className={`absolute left-0 -top-1 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.street ? "peer-valid:-translate-y-6": ""}`}>Street (*)</span>
                        {errors.street && <span className='text-red-500'>{errors.street}</span>}
                    </label>
                </div>
                <div className='flex gap-4 mt-4'>
                    <label className={`flex-1 relative ${errors.state ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`} >
                        <select name="state" onChange={handleStateChange} value={formData.state} className='text-lg w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer'>
                            <option value="" disabled></option>
                            {
                                geography.map((location, idx) => (
                                    <option value={location.state} key={idx}>{location.state}</option>
                                ))
                            }
                        </select>
                        <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.state ? "peer-valid:-translate-y-6":""}`}>State (*)</span>                        
                        {errors.state && <span className='text-red-500'>{errors.state}</span>}
                    </label>
                    <label className={`flex-1 relative ${errors.city ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`}>
                        <select name="city" onChange={handleFieldChange} value={formData.city} className='text-lg w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer'>
                            <option value="" disabled></option>
                            {
                                cities.map((location, idx) => (
                                    <option value={location} key={idx}>{location}</option>
                                ))
                            }
                        </select>
                        <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.city ? "peer-valid:-translate-y-6":""}`}>City (*)</span>                        
                        {errors.city && <span className='text-red-500'>{errors.city}</span>}
                    </label>
                    <label className={`flex-1 relative ${errors.zipcode ? "animate-[wiggle_0.1s_ease-in-out_2s]": ""}`}>
                        <input name='zipcode' type="text" className='text-md w-full px-4 py-2 rounded-md border bg-slate-800 outline-none focus:border-[#03fc56] duration-200 peer' onChange={handleFieldChange} />
                        <span className={`absolute left-0 top-2 mx-2 px-1 text-md duration-200 peer-focus:text-[#03fc56] pointer-events-none peer-focus:-translate-y-6 bg-slate-800 ${formData.zipcode ? "peer-valid:-translate-y-6": ""}`}>ZipCode (*)</span>
                        {errors.zipcode && <span className='text-red-500'>{errors.zipcode}</span>}
                    </label>
                </div>
            </div>
            <PlanDetails setPeriodChange={handleToggle} setPlanChange={handlePlan} />
            <div className='flex justify-center w-full'>
                <button className='mt-8 mb-8 text-3xl text-center bg-[#03fc56] px-4 py-2 rounded-md text-slate-800 border-white border-4 hover:bg-white hover:border-[#03fc56] hover:border-4'>Create Account</button>
            </div>
        </form>
    )
}

export default SignupForm;