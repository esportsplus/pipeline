type Next<I, R> = (input: I) => R;

type Stage<I, R> = (input: I, next: Next<I, R>) => R;


export { Next, Stage };