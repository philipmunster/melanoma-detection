import { SearchCode, Menu } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import IconWithBg from '@/app/components/IconWithBg'

export default function Header() {
    return (
        <header className='flex items-center w-full bg-neutral-100 shadow-sm py-4 md:rounded-t-md'>
            <IconWithBg className='mx-4' Icon={SearchCode} color='red'/>
            <div>
              <h1 className='font-bold text-xl leading-tight'>Melanoma Detection</h1>
              <p className='text-neutral-500 text-xs'>Disclamer: For education purposes only</p>
            </div>
            <SidebarTrigger className='ml-auto mr-5'/>

        </header>
    )
}