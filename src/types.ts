type Next<I, R> = (input: I) => R extends Promise<unknown> ? R : Promise<R> | R;

type Stage<I, R> = (input: I, next: Next<I, R>) => R extends Promise<unknown> ? R : Promise<R> | R;


export { Next, Stage };