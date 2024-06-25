"use client"

import { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Degree } from "@/lib/utils/consts";
import { getUserByUsername } from "@/db/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";

interface UserProfileProps {
    username: string;
}

interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePic: string | null;
    r_number: string;
    major: string;
    minor: string | null;
}

const UserComponent: FC<UserProfileProps> = ({ username }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUserByUsername(username);
            setUser(fetchedUser);
        };

        fetchUser();
    }, [username]);

    if (!user) return <div>User not found</div>;

    const degree = Degree.find((degree) => degree.value === user.major);

    return (
        <div className="flex flex-col items-center w-auto h-auto bg-[#ececec] rounded-lg text-center p-3 justify-center">
            <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                </AvatarFallback>
            </Avatar>
            <h2>{user.firstName} {user.lastName}</h2>
            <h4><span className="text-[#cc0000]">R-Number:</span> {user.r_number}</h4>
            <div className="w-fit px-2 pt-0.5 pb-1 mt-2 rounded-full border" style={{ color: degree?.color, borderColor: degree?.color }}>
                <span>{degree?.name}</span>
            </div>
            <span>{user.minor == "NONE" ? false : user.minor}</span>
        </div>
    );
}

export default UserComponent;
