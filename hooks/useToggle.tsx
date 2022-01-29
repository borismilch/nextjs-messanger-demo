import React from 'react'
import { useState } from 'react'

export default (initialVal: boolean): [boolean, (val: boolean) => void ] => {

  const [open, setOpen] = useState<boolean>(initialVal)

  const changeOpen: (val: boolean) => void = (val) => {
    setOpen(val)
  }
  
  return [open, changeOpen]
}
