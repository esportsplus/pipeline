import { Next, Stage } from './types';


function error(): never {
    throw new Error('Pipeline: final stage did not return a value');
}


export default <I, R>(...fns: Stage<I, R>[]) => {
    let stages: Next<I, R>[] = [];

    for (let i = 0, n = fns.length; i < n; i++) {
        stages.push(
            (input) => fns[i](input, stages[i + 1] || error)
        );
    }

    return stages[0];
};
export { Stage, Next };