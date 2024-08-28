import 'next-auth'
import { DefaultSession } from 'next-auth'

// we are doing this so that we can get access to user data in the callbacks in options.ts
// we are changing the interface so that the user in the callback knows that it has that field
declare module 'next-auth' {
    interface User{
        _id?: string,
        isVerified?: boolean,
        isAcceptingMessage?: boolean,
        username?: string,
    }
    interface Session{
        user:{
            _id?: string,
            isVerified?: boolean,
            isAcceptingMessage?: boolean,
            username?: string,
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT{
        _id?: string,
        isVerified?: boolean,
        isAcceptingMessage?: boolean,
        username?: string,
    }
}