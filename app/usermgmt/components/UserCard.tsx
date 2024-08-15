import { users } from '@/app/misc/types'
import React from 'react'

type Props = {
    user: users;
}

const UserCard = ({ user }: Props) => {
    return (
        <div className='flex justify-between'>
            <div className='gap-2 flex flex-col'>
                <div>
                    <h1 className=''>{user.first + " " + user.middle + " " + user.last}</h1>
                    <h1 className='text-wrap hidden lg:visible'>{user.email}</h1>
                </div>
                <h1 className='text-wrap'>{user.street + ", " + user.city + ", " + user.state}</h1>
            </div>
            <div>
                <h1 className='text-wrap hidden lg:visible'>Users Plan: {user.plantype+" "+user.planperiod}</h1>
            </div>
        </div>
    )
}

export default UserCard