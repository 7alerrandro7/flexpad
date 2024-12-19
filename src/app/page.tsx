'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [valueInput, setValueInput] = useState("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setValueInput(event.target.value);
  }

  const goToFolder = () => {
    router.push(`/${valueInput}`);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <label htmlFor="" className='mr-5'>Folder name:</label>
          <input type="text" onChange={onInputChange} onKeyDown={e => e.key === 'Enter' ? goToFolder() : ''}/>
          <button className="ml-5" type="button" onClick={goToFolder}>
            Go!
          </button>
        </div>
        <h1>Hello! Welcome to this online notepad, created by Faletti!</h1>
      </main>
    </div>
  );
}
