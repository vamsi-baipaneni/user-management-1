"use client";

import { useEffect, useState } from "react";

import React from 'react'
import UsersColumn from "./UsersColumn";
import KeepColumn from "./KeepColumn";
import DeleteColumn from "./DeleteColumn";
import { users } from "@/app/misc/types";

const UserManagementComponent = () => {
    const [users, setUsers] = useState<users[]>();
    const [keepUsers, setKeepUsers] = useState<users[]>();
    const [deleteUsers, setDeleteUsers] = useState<users[]>();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storeUsers = window.localStorage.getItem('userData') || "[]";
            const storeKeepUsers = window.localStorage.getItem('keepData') || "[]";
            const storeDeleteUsers = window.localStorage.getItem('deleteData') || "[]";
            if (storeKeepUsers) {
                setKeepUsers(JSON.parse(storeKeepUsers));
            }
            if (storeDeleteUsers) {
                setDeleteUsers(JSON.parse(storeDeleteUsers));
            }
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

    const handleOnDropKeepUsers = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("keep drop")
        const user = JSON.parse(e.dataTransfer.getData("user"));

        // Update Keep Users
        setKeepUsers((prevKeepUsers) => {
            const updatedKeepUsers = [...prevKeepUsers.filter(u => u.email !== user.email), user];
            window.localStorage.setItem('keepData', JSON.stringify(updatedKeepUsers));
            return updatedKeepUsers;
        });

        // Remove from Delete Users
        if(deleteUsers!==null && deleteUsers!==undefined){
            setDeleteUsers((prevDeleteUsers) => {
                const updatedDeleteUsers = prevDeleteUsers?.filter(u => u.email !== user.email);
                window.localStorage.setItem('deleteData', JSON.stringify(updatedDeleteUsers));
                return updatedDeleteUsers;
            });
        }

        // Remove from Original Users
        if(users!==null && users!==undefined){
            setUsers((prevUsers) => {
                const updatedUsers = prevUsers?.filter(u => u.email !== user.email);
                window.localStorage.setItem('userData', JSON.stringify(updatedUsers));
                return updatedUsers;
            });
        }
    };


    const handleOnDropUsers = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("users drop")
        const user = JSON.parse(e.dataTransfer.getData("user"));

        // Update Delete Users
        setUsers((prevUsers) => {
            const updatedUsers = [...prevUsers.filter(u => u.email !== user.email), user];
            window.localStorage.setItem('userData', JSON.stringify(updatedUsers));
            return updatedUsers;
        });

        // Remove from Keep Users
        if(keepUsers!==null && keepUsers!==undefined){
            setKeepUsers((prevKeepUsers) => {
                const updatedKeepUsers = prevKeepUsers?.filter(u => u.email !== user.email);
                window.localStorage.setItem('keepData', JSON.stringify(updatedKeepUsers));
                return updatedKeepUsers;
            });
        }

        if(deleteUsers!==null && deleteUsers!==undefined){
            setDeleteUsers((prevDeleteUsers) => {
                const updatedDeleteUsers = prevDeleteUsers?.filter(u => u.email !== user.email);
                window.localStorage.setItem('deleteData', JSON.stringify(updatedDeleteUsers));
                return updatedDeleteUsers;
            });
        }
    };

    const handleOnDropDeleteUsers = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("delete drop")
        const user = JSON.parse(e.dataTransfer.getData("user"));

        // Update Delete Users
        setDeleteUsers((prevDeleteUsers) => {
            const updatedDeleteUsers = [...prevDeleteUsers.filter(u => u.email !== user.email), user];
            window.localStorage.setItem('deleteData', JSON.stringify(updatedDeleteUsers));
            return updatedDeleteUsers;
        });

        // Remove from Keep Users
        if(keepUsers!==null && keepUsers!==undefined){
            setKeepUsers((prevKeepUsers) => {
                const updatedKeepUsers = prevKeepUsers?.filter(u => u.email !== user.email);
                window.localStorage.setItem('keepData', JSON.stringify(updatedKeepUsers));
                return updatedKeepUsers;
            });
        }

        // Remove from Original Users
        if(users!==null && users!==undefined){
            setUsers((prevUsers) => {
                const updatedUsers = prevUsers?.filter(u => u.email !== user.email);
                window.localStorage.setItem('userData', JSON.stringify(updatedUsers));
                return updatedUsers;
            });
        }
    };


    return (
        <div className="flex items-center justify-between max-w-[100%]">
            <UsersColumn users={users} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDropUsers={handleOnDropUsers} />
            <KeepColumn users={keepUsers} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDropUsers={handleOnDropKeepUsers} />
            <DeleteColumn users={deleteUsers} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDropUsers={handleOnDropDeleteUsers} />
        </div>
    )
}

export default UserManagementComponent;