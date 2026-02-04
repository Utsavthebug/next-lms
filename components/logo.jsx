import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import logo from '@/public/assets/easylogo.png'

const Logo = ({
    className= ""
}) => {
  return (
    <div>
        <Image
        className={cn("max-w-50",className)}
        src={logo}
        alt='logo'
        />
    </div>
  )
}

export default Logo