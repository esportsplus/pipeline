import type { Next, Stage } from './types';
import error from './error';


class Pipeline<I, R> {
    private chain: Next<I, R> | null = null;
    private stages: Stage<I, R>[] = [];


    constructor(stages: Stage<I, R>[] = []) {
        for (let i = 0, n = stages.length; i < n; i++) {
            this.add(stages[i]);
        }
    }


    private build(): Next<I, R> {
        let chain: Next<I, R> = error;

        for (let i = this.stages.length - 1; i >= 0; i--) {
            let stage = this.stages[i],
                next = chain;

            chain = (input) => stage(input, next);
        }

        return chain;
    }

    add(stage: Stage<I, R>) {
        this.chain = null;
        this.stages.push(stage);

        return this;
    }

    dispatch(input: I) {
        if (!this.chain) {
            this.chain = this.build();
        }

        return this.chain(input);
    }
}


export default <I, R>(stages: Stage<I, R>[] = []) => {
    return new Pipeline(stages);
};
export type { Pipeline, Stage, Next };