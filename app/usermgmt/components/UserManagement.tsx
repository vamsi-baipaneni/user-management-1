"use client";

import { useEffect, useState } from "react";

import React from 'react'
import UsersColumn from "./UsersColumn";
import KeepColumn from "./KeepColumn";
import DeleteColumn from "./DeleteColumn";
import { users } from "@/app/misc/types";

const UserManagementComponent = () => {
    const [users, setUsers] = useState<users[]>();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storeUsers = window.localStorage.getItem('userData') || "[]";
            if (storeUsers) {
                setUsers(JSON.parse(storeUsers));
            }
        }
    }, []);

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleOnDrag = (e: React.DragEvent<HTMLDivElement>, user: users) => {
        const userString = JSON.stringify(user);
        e.dataTransfer.setData('user', userString);
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, columnValue: string) => {
        console.log(columnValue)
        const user = JSON.parse(e.dataTransfer.getData("user"));
        user.column = columnValue;
        setUsers((prevUsers)=>{
            const updatedUsers = [...prevUsers.filter((prevUser)=>prevUser.email!==user.email), user];
            window.localStorage.setItem("userData",JSON.stringify(updatedUsers));
            return updatedUsers;
        })
    };

    return (
        <div className="flex items-start max-w-[100%] gap-[1px] overflow-y-auto flex-grow mt-4">
            <UsersColumn users={users} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDrop={handleOnDrop} />
            <KeepColumn users={users} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDrop={handleOnDrop} />
            <DeleteColumn users={users} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDrop={handleOnDrop} />
        </div>
    )
}

export default UserManagementComponent;