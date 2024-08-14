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
        if (keepUsers?.length !== 0) {
            setKeepUsers(
                [...keepUsers?.filter((user) => { JSON.stringify(user) !== e.dataTransfer.getData("user") }),
                JSON.parse(e.dataTransfer.getData("user"))]
            )
        }
        else {
            setKeepUsers([JSON.parse(e.dataTransfer.getData("user"))]);
        }

        deleteUsers?.forEach((user) => {
            if (JSON.stringify(user) === e.dataTransfer.getData("user")) {
                setDeleteUsers([
                    ...deleteUsers.filter(
                        (userContainer) =>
                            JSON.stringify(userContainer) !== e.dataTransfer.getData("user")
                    ),
                ]);
            }
        });

        users?.forEach((user) => {
            if (JSON.stringify(user) === e.dataTransfer.getData("user")) {
                setUsers([
                    ...users.filter(
                        (userContainer) =>
                            JSON.stringify(userContainer) !== e.dataTransfer.getData("user")
                    ),
                ]);
            }
        });
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('keepData');
        window.localStorage.removeItem('deleteData');
        window.localStorage.setItem('userData', JSON.stringify(users) || "[]");
        window.localStorage.setItem('keepData', JSON.stringify(keepUsers) || "[]");
        window.localStorage.setItem('deleteData', JSON.stringify(deleteUsers) || "[]");
    }

    const handleOnDropUsers = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("here1");
        if (users?.length !== 0) {
            setUsers(
                [...users?.filter((user) => { JSON.stringify(user) !== e.dataTransfer.getData("user") }),
                JSON.parse(e.dataTransfer.getData("user"))]
            )
            console.log("here2");
        }
        else {
            setUsers([JSON.parse(e.dataTransfer.getData("user"))]);
            console.log("here3");
        }

        deleteUsers?.forEach((user) => {
            if (JSON.stringify(user) === e.dataTransfer.getData("user")) {
                setDeleteUsers([
                    ...deleteUsers.filter(
                        (userContainer) =>
                            JSON.stringify(userContainer) !== e.dataTransfer.getData("user")
                    ),
                ]);
            }
        });

        keepUsers?.forEach((user) => {
            console.log("here4")
            if (JSON.stringify(user) === e.dataTransfer.getData("user")) {
                setKeepUsers([
                    ...keepUsers.filter(
                        (userContainer) =>
                            JSON.stringify(userContainer) !== e.dataTransfer.getData("user")
                    ),
                ]);
                console.log("here5")
            }
        });
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('keepData');
        window.localStorage.removeItem('deleteData');
        window.localStorage.setItem('userData', JSON.stringify(users) || "[]");
        window.localStorage.setItem('keepData', JSON.stringify(keepUsers) || "[]");
        window.localStorage.setItem('deleteData', JSON.stringify(deleteUsers) || "[]");
    }

    const handleOnDropDeleteUsers = (e: React.DragEvent<HTMLDivElement>) => {
        const transferUser = e.dataTransfer.getData("user");
        const usersToDelete = deleteUsers;
        usersToDelete?.filter((user) => {
            JSON.stringify(user) !== transferUser;
        })
        usersToDelete?.push(JSON.parse(transferUser));
        setDeleteUsers(usersToDelete);

        setUsers((prevUsers) => prevUsers?.filter(user => JSON.stringify(user) !== e.dataTransfer.getData("user")));
        setKeepUsers((prevUsers) => prevUsers?.filter(user => JSON.stringify(user) !== e.dataTransfer.getData("user")));

        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('keepData');
        window.localStorage.removeItem('deleteData');
        window.localStorage.setItem('userData', JSON.stringify(users) || "[]");
        window.localStorage.setItem('keepData', JSON.stringify(keepUsers) || "[]");
        window.localStorage.setItem('deleteData', JSON.stringify(deleteUsers) || "[]");
    }

    return (
        <div className="flex items-center justify-between max-w-[100%]">
            <UsersColumn users={users} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDropUsers={handleOnDropUsers} />
            <KeepColumn users={keepUsers} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDropUsers={handleOnDropKeepUsers} />
            <DeleteColumn users={deleteUsers} handleOnDrag={handleOnDrag} handleOnDragOver={handleOnDragOver} handleOnDropUsers={handleOnDropDeleteUsers} />
        </div>
    )
}

export default UserManagementComponent;