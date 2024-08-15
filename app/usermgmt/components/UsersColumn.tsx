import React from 'react'
import { users } from '@/app/misc/types';
import UserCard from './UserCard';

type Props = {
  users: users[];
  handleOnDrag: (e: React.DragEvent<HTMLDivElement>, user: users) => void;
  handleOnDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleOnDrop: (e: React.DragEvent<HTMLDivElement>, columnValue: string) => void;
}

const UsersColumn = ({ users, handleOnDrag, handleOnDragOver, handleOnDrop }: Props) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-2xl'>Original List</h1>
      <div
      className='flex flex-col bg-white w-[33vw] min-h-[50vh] flex-grow p-10 gap-10 border-dashed border-2 border-slate-800'
      onDragOver={handleOnDragOver}
      onDrop={(e)=>{handleOnDrop(e,"default")}}
    >
      {
        users?.filter((user)=> user.column === "default").map((user, idx) => (
          <div className='text-white bg-slate-600 rounded-md p-4 flex gap-8 text-nowrap' draggable
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

export default UsersColumn