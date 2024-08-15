"use client";

import React, { useState } from 'react'
import { form } from "@/app/misc/types";
import { plans } from '@/app/misc/plan';
import { Span } from 'next/dist/trace';

type Props = {
    setPeriodChange: (annual: boolean) => void;
    setPlanChange: (plan: string)=>void;
}

const PlanDetails = ({ setPeriodChange, setPlanChange }: Props) => {
    const [annual, setAnnual] = useState(false);
    const [plan, setPlan] = useState("High");
    const handlePlanPeriodChange = ()=>{
        setPeriodChange(!annual);
        setAnnual(!annual);
    }
    const handlePlanSelect = (planValue: string)=>{
        setPlanChange(planValue);
        setPlan(planValue);
    }
    return (
        <div className='flex flex-col items-center justify-center mt-12 gap-5'>
            <h3 className='text-3xl font-bold'>See our pricing plans</h3>
            <p className='text-md mx-auto px-4 tracking-tight -mt-5'>Please browse our options and choose the right plan for you</p>
            <div className='mt-8'>
                <label className='inline-flex items-center cursor-pointer'>
                    <span className='mr-8 text-2xl font-thin cursor-pointer'>Monthly</span>
                    <div className='w-12 h-6 bg-gray-300 rounded-full transition duration-200 ease-in'>
                        <div className={`w-6 h-6 rounded-full transition duration-100 ease-in ${annual ? "bg-[#03fc56] ml-6" : "bg-white"}`}>
                        <input type='checkbox' className='hidden' checked={annual} onChange={handlePlanPeriodChange}/>
                        </div>
                    </div>
                    <span className='ml-8 text-2xl font-thin cursor-pointer'>Annual</span>
                </label>
            </div>
            <div className='mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:w-11/12 mx-auto'>
                {
                    plans.map((selectedPlan,idx)=>(
                        <div key={idx} className={`border-2 py-10 md:px-6 px-4 rounded-lg shadow-3xl ${selectedPlan.name===plan ? "bg-[#03fc56] text-slate-800 scale-105": "bg-slate-800"}`}>
                            <h3 className={`text-xl font-bold text-center text-[#03fc56] ${selectedPlan.name===plan ? " text-slate-800": "text-[#03fc56]"}`}>{selectedPlan.name}</h3>
                            <p className='mt-3 text-wrap'>{selectedPlan.description}</p>
                            <p className={`text-2xl font-bold tracking-wide text-center mt-3 text-[#03fc56] ${selectedPlan.name===plan ? "text-slate-800":"text-[#03fc56]"}`}>
                                {annual ? `${selectedPlan.yearly}`:`${selectedPlan.monthly}`}
                            </p>
                            <ul className='mt-3 list-disc px-6 md:px-4'>
                                {
                                    selectedPlan.points.map((point,idx)=>(
                                        <li key={idx} className='text-wrap gap-3'>{point}</li>
                                    ))
                                }
                            </ul>
                            <div className='w-full mx-auto mt-8 flex items-center justify-center'>
                                <button className={`flex justify-center items-center bg-[#03fc56] border-white border-4 py-2 px-6 rounded-full text-slate-800 hover:bg-white hover:border-[#03fc56] hover:border-4 ${selectedPlan.name===plan ? "bg-slate-800 text-white hover:bg-[#03fc56] hover:text-slate-800 hover:border-slate-800 hover:border-4": ""}`} onClick={(e)=>{e.preventDefault();handlePlanSelect(selectedPlan.name)}}>Select</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlanDetails