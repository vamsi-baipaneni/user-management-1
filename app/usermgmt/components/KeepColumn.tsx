import { users } from '@/app/misc/types';
import React from 'react'
import UserCard from './UserCard';

type Props = {
  users: users[];
  handleOnDrag : (e: React.DragEvent<HTMLDivElement>, user: users) => void;
  handleOnDragOver : (e: React.DragEvent<HTMLDivElement>) => void;
  handleOnDrop : (e: React.DragEvent<HTMLDivElement>, columnValue:string) => void;
}

const KeepColumn = ({ users, handleOnDrag, handleOnDragOver, handleOnDrop }: Props) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-2xl'>Keep Users</h1>
      <div
      className='flex flex-col bg-white w-[33vw] flex-grow min-h-[50vh] p-10 gap-10 border-dashed border-2 border-indigo-600'
      onDragOver={handleOnDragOver}
      onDrop={(e)=>handleOnDrop(e,"keep")}
      >
      {
        users?.filter((user)=> user.column === "keep").map((user, idx) => (
          <div className='text-slate-700 bg-blue-300 rounded-md p-4 flex gap-8 text-nowrap' draggable
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

export default KeepColumn