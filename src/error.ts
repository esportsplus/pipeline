export default (): never => {
    throw new Error('Pipeline: final stage did not return a value');
};