import React from 'react'
import { Button } from "@/components/ui/button"
import { Link, Navigate, Outlet } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

const Header = () => {
    const { user, isLoaded, isSignedIn } = useUser()

    return (
        <div className='flex justify-between shadow-md md:py-4 py-3 px-4 md:px-8'>
            <Link to="/" className=''>
                <img className='w-[35px] object-fill md:w-[40px]' src="src/assets/logo.svg" alt="" />
            </Link>
            {
                isSignedIn ? <div className='flex items-center gap-3'>
                    <Link to="/dashbord">
                        <Button className="" variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton className="h-[500px] w-[200px]" />
                </div>
                    :
                    <Link to={"/auth/sign-in"}>
                        <Button className="bg-[#5417D7]">Get Started</Button>

                    </Link>
            }
            

        </div>
    )
}

export default Header