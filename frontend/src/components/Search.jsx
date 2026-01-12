import React from 'react'
import { Search } from 'lucide-react'
import { Input } from './ui/input'

function SearchComponent() {
    return (
        <div className="flex items-center gap-2 px-2 pb-2">
            <div className="relative w-full">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 bg-slate-800 text-white border-slate-700 focus-visible:ring-slate-600 placeholder:text-slate-400"
                />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            </div>
        </div>
    )
}

export default SearchComponent
