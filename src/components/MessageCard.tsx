'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
import { X } from "lucide-react"
import React from 'react'
import { Button } from "./ui/button"
import { Message } from "@/model/user"
import { useToast } from "./ui/use-toast"
import { ApiResponse } from "@/types/ApiResponse"
import axios, { AxiosError } from "axios"
import dayjs from 'dayjs'

type MessageCardProps = {
    message: Message,
    onMessageDelete: (messageId: string) => void
}

const MessageCard = ({message, onMessageDelete}:MessageCardProps) => {
    
    const {toast} = useToast()
    const handleDelete = async () => {
      console.log(message._id)
        try {
          const result = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
  
          toast({
              title: result.data.message
          })
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          return Response.json({axiosError})
        }

    onMessageDelete(`${message._id}`) //might cause problem
    }

  return (
    <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>

  )
}

export default MessageCard