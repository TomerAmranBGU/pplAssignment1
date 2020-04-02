/* Question 1 */
interface Some<T> {
    tag: "Some";
    value: T;
}
interface None {
    tag: "None"
}

export type Optional<T> = Some<T> | None;

export const makeSome = <T>(x:T): Some<T> => ({tag:"Some", value:x});
export const makeNone = (): None => ({tag:"None"});

export const isSome = <T>(x:any): x is Some<T> => x.tag == "Some";
export const isNone = (x:any): x is None => x.tag == "None";

/* Question 2 */
export const bind = <T,U>(optional:Optional<T>, f:(x:T)=>Optional<U>):Optional<U>  =>
    isSome(optional) ? 
        f(optional.value):
        makeNone();