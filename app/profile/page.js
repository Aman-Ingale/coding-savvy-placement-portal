"use client"
import { useEffect, useState } from 'react'
import { getProfile } from '../actions/profile.actions'

export default async function Page() {
    const [data,setData] = useState("")
    
    useEffect(()=>{
      async function getData() {
      setData(await getProfile())
      }
      getData()
      console.log(data)
    },[])
    
  return (
    <></>
  )
}
