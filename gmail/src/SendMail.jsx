import React from 'react'
import './SendMail.css'
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { closeSendMessage } from './features/mailSlice'
import { db } from './firebase'
import { addDoc, serverTimestamp } from 'firebase/firestore/lite'
import { collection } from "firebase/firestore/lite";


function SendMail() {

  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
      const emails = collection(db, 'emails')
      await addDoc(emails, {
        to: data.to,
        subject: data.subject,
        message: data.message,
        timestamp: serverTimestamp()
      })

      dispatch(closeSendMessage())
  }

  // console.log(watch("to"));
  // console.log(watch("subject"));
  // console.log(watch("message"));


  return (
    <div className='sendMail'>
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon className='sendMail__close' onClick={() => dispatch(closeSendMessage())} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder='To' {...register("to", { required: true })} />
        {errors.to && <p className='sendEmail__error'>To field is required</p>}

        <input type="text" placeholder='Subject' {...register("subject", { required: true })} />
        {errors.subject && <p className='sendEmail__error'>Subject field is required</p>}

        <input type="text" placeholder='Message...' className='sendMail__message' {...register("message", { required: true })} />
        {errors.message && <p className='sendEmail__error'>Message field is required</p>}

        <div className="sendMail__options">
          <Button className='sendMail__send'type='submit'>Send</Button>
        </div>
      </form>
    </div>
  )
}

export default SendMail