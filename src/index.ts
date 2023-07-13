import { Next, Stage } from './types';


function error(): never {
    throw new Error('Pipeline: stage did not return a value');
}

function next<I, R>(i: number, stages: Stage<I, R>[]): Next<I, R> {
    return (input) => stages[i](
        input,
        ++i < stages.length ? next(i, stages) : error
    );
}


export default <I, R>(...stages: Stage<I, R>[]) => {
    if (!stages.length) {
        throw new Error('Pipeline: stages have not been defined');
    }

    return next(0, stages);
};
export { Stage, Next };