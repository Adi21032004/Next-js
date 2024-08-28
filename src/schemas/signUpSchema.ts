import {z} from 'zod'

export const usernameValidate = z.string()
                                 .min(2,"Username must be atleast 2 characters")
                                 .max(20,"Username must be no more than 20 characters")
                                 .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,"Username must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidate,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6,{message: "Password must be at least 6 character"})
})