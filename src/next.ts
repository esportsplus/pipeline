import { Next, Stage } from './types';
import error from './error';


const next = <I, R>(i: number, stages: Stage<I, R>[]): Next<I, R> => {
    let n = i + 1;

    return (input: I) => stages[i](
        input,
        n < stages.length ? next(n, stages) : error
    );
};


export default next;