import React from 'react'
import { users } from '@/app/misc/types';
import UserCard from './UserCard';

type Props = {
  users: users[];
  handleOnDrag: (e: React.DragEvent<HTMLDivElement>, user: users) => void;
  handleOnDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleOnDrop: (e: React.DragEvent<HTMLDivElement>, columnValue: string) => void;
}

const DeleteColumn = ({ users, handleOnDrag, handleOnDragOver, handleOnDrop }: Props) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-2xl'>Delete Users</h1>
      <div
      className='flex flex-col bg-white w-[33vw] min-h-[50vh] flex-grow p-10 gap-10 border-dashed border-2 border-red-600'
      onDragOver={handleOnDragOver}
      onDrop={(e)=>handleOnDrop(e,"delete")}
    >
      {
        users?.filter((user)=> user.column === "delete").map((user, idx) =>
        (
          <div className='text-slate-700 bg-red-300 rounded-md p-4 flex gap-8 text-nowrap' draggable
            onDragStart={e => handleOnDrag(e, user)}
            key={idx}
          >
            <UserCard user={user}/>
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default DeleteColumn