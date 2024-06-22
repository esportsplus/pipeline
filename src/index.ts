import { Next, Stage } from './types';
import error from './error';
import next from './next';


class Pipeline<I, R> {
    private stages: Next<I, R>[] = [];


    constructor(stages: Stage<I, R>[] = []) {
        this.add(stages);
    }


    add(stages: Stage<I, R>[]) {
        let total = this.stages.length;

        for (let i = 0, n = stages.length; i < n; i++) {
            this.stages.push(
                (input) => stages[total + i](input, this.stages[total + i + 1] || error)
            );
        }

        return this;
    }

    dispatch(input: I) {
        return this.stages[0](input);
    }
}


export default <I, R>(...stages: Stage<I, R>[]) => {
    return new Pipeline(stages);
};
export { next };
export { Stage, Next };