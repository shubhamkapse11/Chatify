import React from 'react'
import SearchComponent from '../../components/Search'
import { cn } from '../../lib/utils'
import { LogOut } from 'lucide-react'

function Left() {
    // Static user data
    const users = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com" },
        { id: 2, name: "Bob Smith", email: "bob@introvert.com" },
        { id: 3, name: "Charlie Brown", email: "charlie@peanuts.com" },
        { id: 4, name: "Diana Prince", email: "diana@amazon.com" },
        { id: 5, name: "Evan Wright", email: "evan@write.com" },
        { id: 6, name: "Fiona Gallagher", email: "fiona@chicago.com" },
        { id: 7, name: "George Martin", email: "george@winterfell.com" },
        { id: 8, name: "Hannah Montana", email: "hannah@popstar.com" },
        { id: 9, name: "Ian Somerhalder", email: "ian@vampire.com" },
        { id: 10, name: "Jack Daniels", email: "jack@whiskey.com" },
    ]

    return (
        <div className='w-[30%] h-full bg-slate-950 border-r border-slate-800 flex flex-col'>
            {/* Header */}
            <h1 className='text-2xl font-bold p-4 text-white tracking-wide'>Chat App</h1>

            {/* Search */}
            <SearchComponent />

            {/* Divider */}
            <hr className='border-slate-800 my-2' />

            {/* User List Script */}
            <div className='flex-1 overflow-y-auto px-2 space-y-2 no-scrollbar'>
                {users.map((user) => (
                    <div
                        key={user.id}
                        className={cn(
                            "flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors",
                            "hover:bg-slate-800 text-slate-200 hover:text-white"
                        )}
                    >
                        {/* Avatar Placeholder */}
                        <div className='h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium'>
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        {/* User Info */}
                        <div className='flex flex-col'>
                            <span className='font-medium'>{user.name}</span>
                            <span className='text-xs text-slate-400'>{user.email}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='p-4 flex items-center gap-2 bg-slate-800  rounded-lg hover:bg-slate-700 transition-colors'>
                <LogOut className="w-4 h-4 mr-2" />
                <button className='text-white px-4 py-2 '>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Left
