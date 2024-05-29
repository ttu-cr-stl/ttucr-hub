import { User } from '@prisma/client';
import React, { FC } from 'react'

interface OrgsOnboardProps {
  user: User;
}

const OrgsOnboard: FC<OrgsOnboardProps> = ({ user }) => {

    console.log(user)
    
    return (
        <div className={''}></div>
    )
}

export default OrgsOnboard;