import { users } from '@/app/misc/types';
import React from 'react'

type Props = {
  users: users[];
  handleOnDrag : (e: React.DragEvent<HTMLDivElement>, user: users) => void;
  handleOnDragOver : (e: React.DragEvent<HTMLDivElement>) => void;
  handleOnDropKeepUsers : (e: React.DragEvent<HTMLDivElement>) => void;
}

const KeepColumn = ({ users, handleOnDrag, handleOnDragOver, handleOnDropKeepUsers }: Props) => {
  return (
    <div className='flex flex-col bg-blue-800 w-[33vw] min-h-[100vh] p-10 gap-10'
      onDragOver={handleOnDragOver}
      onDrop={handleOnDropKeepUsers}
      >
      {
        users?.map((user, idx) => (
          <div className='text-black bg-white rounded-md p-4 flex gap-8 justify-between' draggable
            onDragStart={e => handleOnDrag(e, user)}
            key={idx}
          >
            <div className='flex flex-col gap-6'>
              <div>
                <h1 className='text-l'>{user.first + " " + user.middle + " " + user.last}</h1>
                <h1 className='text-l'>{user.email}</h1>
              </div>
              <h2 className='text-sm'>{user.street + ", " + user.city + ", " + user.state}</h2>
            </div>
            <div>
              <h2 className='text-sm'>User Plan: {user.plantype + ", " + user.planperiod}</h2>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default KeepColumn