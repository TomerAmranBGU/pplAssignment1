import { reduce } from "ramda";

/* Question 3 */
interface Ok<T> {tag:"Ok"; value:T};
interface Failure {tag:"Failure"; message: string};

export type Result<T> = Ok<T> | Failure;

export const makeOk = <T>(x:T): Ok<T> => ({tag:"Ok", value:x});
export const makeFailure = (s:string) : Failure => ({tag:"Failure", message:s});

export const isOk =<T>(x:any): x is Ok<T> => (x.tag == "Ok");
export const isFailure = (x:any): x is Failure=>(x.tag == "Failure");

/* Question 4 */
export const bind = <T,U>(x:Result<T>, f: (y:T)=> Result<U>): Result<U> =>
    isOk(x) ? 
        f(x.value):
        x;

/* Question 5 */
interface User {
    name: string;
    email: string;
    handle: string;
}

const validateName = (user: User): Result<User> =>
    user.name.length === 0 ? makeFailure("Name cannot be empty") :
    user.name === "Bananas" ? makeFailure("Bananas is not a name") :
    makeOk(user);

const validateEmail = (user: User): Result<User> =>
    user.email.length === 0 ? makeFailure("Email cannot be empty") :
    user.email.endsWith("bananas.com") ? makeFailure("Domain bananas.com is not allowed") :
    makeOk(user);

const validateHandle = (user: User): Result<User> =>
    user.handle.length === 0 ? makeFailure("Handle cannot be empty") :
    user.handle.startsWith("@") ? makeFailure("This isn't Twitter") :
    makeOk(user);

export const naiveValidateUser = (user:User): Result<User> =>{
    const resName = validateName(user);
    if(isFailure(resName))
        return resName;
    else{
        const resEmail = validateEmail(user)
        if(isFailure(resEmail))
            return resEmail;
        else 
            return validateHandle(user);
    }
}


export const monadicValidateUser = (user:User): Result<User> => 
    reduce(bind,validateName(user), [validateEmail,validateHandle]);
    