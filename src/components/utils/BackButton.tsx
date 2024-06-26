'use client'
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import { Button } from '../ui/shadcn/button';
import { ArrowLeft } from 'react-feather';

export const BackButton: FC = () => {
    const router = useRouter()
    
    return (
      <Button className='w-20' onClick={router.back}>
        <ArrowLeft className="text-lg" />
      </Button>
    );
}