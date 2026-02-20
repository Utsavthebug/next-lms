import NextAuth from 'next-auth';
import CredentialsProvider  from'next-auth/providers/credentials'
import { User } from './models/user-model';
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config';

export const { handlers,auth, signIn, signOut } = NextAuth({
        ...authConfig,
    providers:[CredentialsProvider({
       async authorize(credentials) {
        try {
            const user = await User.findOne({
                email : credentials?.email
            })

            if(user) {
                const isMatch = await bcrypt.compare(credentials?.password,user.password)

                if(isMatch) {return user}

                else {
                    throw new Error('Check your credentials')
                }
            }
            else {
            throw new Error('Check your credentials')

            }

        } catch (error) {
            throw new Error('Check your credentials')
            
        }
       } 
    })],
});