"use client";
import React, { useState } from 'react'
import UserCard from './UserCard';
import { users } from '@/app/misc/types';

const UserManagementComponent = () => {
    const [users, setUsers] = useState<users[]>(JSON.parse(localStorage.getItem('userData')));
    return (
        <div className='flex flex-col items-center mx-auto'>
            <h2 className='text-2xl font-light text-center mb-[68px]'>Users List</h2>
            <div className='bg-slate-800 flex w-auto md:w-full md:max-w-[900px] p-6 rounded-md text-white'>
                {
                    users.map((user)=>(
                        <UserCard user={user}/>
                    ))
                }
            </div>
        </div>
    )
}

export default UserManagementComponent;