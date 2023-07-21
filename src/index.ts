import { Next, Stage } from './types';


function error(): never {
    throw new Error('Pipeline: final stage did not return a value');
}

function next<I, R>(i: number, stages: Stage<I, R>[]): Next<I, R> {
    let n = i + 1;

    return (input) => stages[i](
        input,
        n < stages.length ? next(n, stages) : error
    );
}


export default <I, R>(...stages: Stage<I, R>[]) => {
    return next(0, stages);
};
export { Stage, Next };