"use client"
import { Button } from '@/components/ui/button';
import { usePrivy } from '@privy-io/react-auth';

export default function Settings() {
    const {logout} = usePrivy();

    return (
        <div className="px-4 pt-10">
            <Button onClick={logout}>
                Log out
            </Button>
        </div>
    )
}