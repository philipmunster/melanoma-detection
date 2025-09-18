import { SearchCode, Menu } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function Header() {
    return (
        <header className='h-22 flex items-center w-full bg-neutral-100 shadow-sm'>
            <div className='bg-red-600 mx-4 h-14 aspect-square flex justify-center items-center rounded-lg'>
                <SearchCode className='w-8 h-8 text-white'/>
            </div>
            <h1 className='font-bold text-xl leading-tight'>Melanoma Detection</h1>

        </header>
    )
}