'use client'
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import { Button } from '../ui/shadcn/button';
import { ArrowLeft, ChevronLeft } from 'react-feather';

export const BackButton: FC = () => {
    const router = useRouter()
    
    return (
      <div className="flex items-center justify-center w-12 h-12 bg-[#F5F5F5] rounded-lg">
        <ChevronLeft className="w-10 h-10" onClick={router.back} />
      </div>
    );
}