import { Next, Stage } from './types';
import error from './error';
import next from './next';


export default <I, R>(...fns: Stage<I, R>[]) => {
    let stages: Next<I, R>[] = [];

    for (let i = 0, n = fns.length; i < n; i++) {
        stages.push(
            (input) => fns[i](input, stages[i + 1] || error)
        );
    }

    return stages[0];
};
export { next };
export { Stage, Next };