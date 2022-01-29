import React, { ChangeEvent } from 'react';
import { useState } from 'react'

const useFormValues: (fields: string[]) => any = (fields) => {

  const initialValue = {}

  fields.forEach(field => {
    initialValue[field] = ''
  })

  const [form, setForm] = useState<typeof initialValue>(initialValue)

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const cleanForm = () => {
    setForm(initialValue)
  }

  return [
    form, 
    changeForm,
    cleanForm
  ]
};

export default useFormValues;
