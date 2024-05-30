'use client'
import { NavPath } from '@/lib/utils/consts';
import { useLogin } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from '../ui/button';

interface LoginBtnProps {
  
}

const LoginBtn: FC<LoginBtnProps> = ({  }) => {

    const {login} = useLogin({
        onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
            console.log(user, isNewUser, wasAlreadyAuthenticated);
            // Any logic you'd like to execute if the user is/becomes authenticated while this
            // component is mounted

            // router.push(NavPath.HOME);
        },
        onError: (error) => {
            console.log(error);
            // Any logic you'd like to execute after a user exits the login flow or there is an error
            // Display warning toast, etc.
        },
    });
  
    return (
        <Button onClick={login}>Login</Button>
    )
}

export default LoginBtn;