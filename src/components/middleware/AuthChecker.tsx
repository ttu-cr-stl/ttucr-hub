'use client'
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';

const AuthChecker: FC<{children: ReactNode}> = ({ children }) => {

    const {ready, authenticated} = usePrivy();
    const router = useRouter();

    if (!ready) {
        // Do nothing while the PrivyProvider initializes with updated user state
        return <><span>loading...</span></>;
    }

    if (ready && !authenticated) {
        router.push('/')
    }

    return (
        <>{authenticated && <>{children}</>}</>
    )
}

export default AuthChecker;