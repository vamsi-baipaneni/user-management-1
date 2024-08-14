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
    plantype: "",
    planperiod: "Monthly"
}

const SignupForm = () => {
    const [formData, setFormData] = useState<form>(initialData);
    const [errors, setErrors] = useState<form>(initialData);
    const [state, setState] = useState("");
    const [cities, setCities] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    }
    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
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
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <h2 className='text-4xl text-white tracking-wide font-semibold'>Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-l font-light tracking-tighttext-white flex-1'>First Name
                    <input name='first' type="text" className='w-full px-2 py-2 rounded-md border text-black' placeholder='Your First Name' onChange={handleFieldChange} />
                </label>
                <label className='text-l font-light tracking-tighttext-white flex-1'>Last Name
                    <input name='last' type="text" className='w-full px-2 py-2 rounded-md border text-black' placeholder='Your Last Name' onChange={handleFieldChange} />
                </label>
                <label className='text-l font-light tracking-tighttext-white flex-1'>Middle Name
                    <input name='middle' type="text" className='w-full px-2 py-2 rounded-md border text-black' placeholder='Your Middle Name' onChange={handleFieldChange} />
                </label>
            </div>
            <label className='text-l font-light tracking-tighttext-white flex-1'>Email
                <input name='email' type="text" className='w-full px-2 py-2 rounded-md border text-black' placeholder='Your Email Here' onChange={handleFieldChange} />
                {errors.email && <span className='text-white'>{errors.email}</span>}
            </label>
            <div className='flex flex-col md:flex-row justify-between gap-5'>
                <div className='md:w-[50%]'>
                    <label className='text-l font-light tracking-tighttext-white flex-1'>Street Address
                        <input name='street' type="text" className='w-full px-2 py-2 rounded-md border text-black' placeholder='Your Street Here' onChange={handleFieldChange} />
                        {errors.street && <span className='text-white'>{errors.street}</span>}
                    </label>
                </div>
                <div className='flex gap-4'>
                    <label className='text-l font-light tracking-tight text-white flex-1'>State
                        <select name="state" onChange={handleStateChange} value={formData.state} className='text-black rounded-md px-1 py-2.5'>
                            <option value="" disabled>Please select a state</option>
                            {
                                geography.map((location, idx) => (
                                    <option value={location.state} key={idx}>{location.state}</option>
                                ))
                            }
                        </select>
                        {errors.street && <span className='text-white'>{errors.state}</span>}                   </label>
                    <label className='text-l font-light tracking-tight text-white flex-1'>City
                        <select name="city" onChange={handleFieldChange} value={formData.city} className='text-black rounded-md px-1 py-2.5'>
                            <option value="" disabled>Please select a City</option>
                            {
                                cities.map((location, idx) => (
                                    <option value={location} key={idx}>{location}</option>
                                ))
                            }
                        </select>
                        {errors.street && <span className='text-white'>{errors.city}</span>}
                    </label>
                    <label className='text-l font-light tracking-tighttext-white flex-1'>ZipCode
                        <input name='zipcode' type="number" className='w-full px-2 py-2 rounded-md border text-black' onChange={handleFieldChange} />
                        {errors.zipcode && <span className='text-white'>{errors.zipcode}</span>}
                    </label>
                </div>
            </div>
            <PlanDetails formData={formData} setPeriodChange={handleToggle} setPlanChange={handlePlan} />
            <div className='flex justify-center w-full'>
                <button className='mt-8 mb-8 text-3xl text-center bg-[#03fc56] px-4 py-2 rounded-md text-slate-800 border-white border-4 hover:bg-white hover:border-[#03fc56] hover:border-4'>Create Account</button>
            </div>
        </form>
    )
}

export default SignupForm;