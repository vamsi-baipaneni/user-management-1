import React from 'react'
import { users } from '@/app/misc/types';

type Props = {
  users: users[];
  handleOnDrag : (e: React.DragEvent<HTMLDivElement>, user: users) => void;
  handleOnDragOver : (e: React.DragEvent<HTMLDivElement>) => void;
  handleOnDropUsers : (e: React.DragEvent<HTMLDivElement>) => void;
}

const UsersColumn = ({ users, handleOnDrag, handleOnDragOver, handleOnDropUsers }: Props) => {
  return (
    <div 
      className='flex flex-col bg-slate-800 w-[33vw] min-h-[100vh] p-10 gap-10'
      onDragOver={handleOnDragOver}
      onDrop={handleOnDropUsers}
      >
      {
        users?.map((user, idx) => (
          <div className='text-black bg-white rounded-md p-4 flex gap-8 text-nowrap' draggable
            onDragStart={e => handleOnDrag(e, user)}
            key={idx}
          >
            {user.first}
          </div>
        ))
      }
    </div>
  )
}

export default UsersColumn