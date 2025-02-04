import { Next, Stage } from './types';
import error from './error';
import next from './next';


class Pipeline<I, R> {
    private stages: Next<I, R>[] = [];


    constructor(stages: Stage<I, R>[] = []) {
        for (let i = 0, n = stages.length; i < n; i++) {
            this.add(stages[i]);
        }
    }


    add(stage: Stage<I, R>) {
        let n = this.stages.length + 1;

        this.stages.push(
            (input) => stage(input, this.stages[n] || error)
        );

        return this;
    }

    dispatch(input: I) {
        return this.stages[0](input);
    }
}


export default <I, R>(stages: Stage<I, R>[] = []) => {
    return new Pipeline(stages);
};
export { next };
export { Pipeline, Stage, Next };