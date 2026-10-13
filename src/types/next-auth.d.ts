import "next-auth"
import "next-auth/jwt"
declare module "next-auth" {
    interface User {
        user: Iuserdata
        token: string
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        user: Iuserdata
    }
}
interface Iuserdata {
    name: string
    role: string
    email: string
}
