'use client'

import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { Button } from '../ui/button'

export default function Counter() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div className='mt-4 flex items-center gap-3'>
      <Button size='sm' onClick={decrement}>
        <MinusIcon />
      </Button>
      <p>Current vote: {count}</p>
      <Button size='sm' onClick={increment}>
        <PlusIcon />
      </Button>
    </div>
  )
}
