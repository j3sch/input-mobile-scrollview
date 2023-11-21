import Image from 'next/image'
import { Inter } from 'next/font/google'
import { VirtualList } from '@/components/VirtualList'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const chat = [
    {
        text: 'one',
    },
    // {
    //     text: 'two',
    // },
    // {
    //     text: 'three',
    // },
    // {
    //     text: 'four',
    // },
    // {
    //     text: 'five',
    // },
    // {
    //     text: 'six',
    // },
    // {
    //     text: 'seven',
    // },
]

export default function Home() {
    const [data, setData] = useState<{ text: string }[]>([])
    const ChatItem = ({ text }: { text: string }) => (
        <div className='flex items-center my-1 px-4 justify-between w-full h-24 bg-gray-900 rounded-md shadow-md'>
            <span>{text}</span>
        </div>
    )

    const Input = () => {
        const [value, setValue] = useState('')
        return (
            <input
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        setData((prev) => [...prev, { text: value }])
                        setValue('')
                    }
                }}
                onSubmit={() => setValue('')}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                placeholder='you@example.com'
            />
        )
    }

    return (
        <main className={`flex h-[100svh] w-full flex-col ${inter.className}`}>
            <div className='h-12 bg-red-500 w-full' />
            <VirtualList
                data={data}
                itemHeight={190}
                renderItem={({ text }: { text: string }) => <ChatItem text={text} />}
            />
            <div className='py-2 px-4'>
                <Input />
            </div>
        </main>
    )
}
