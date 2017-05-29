function bufferedPool(getter, picker) {
    let pool = [];
    let promiseOfPool = getter().then(results => {
        pool = results;
        return pool;
    });
    return function() {
        return promiseOfPool.then(function() {
            if (pool.length === 0) {
                throw new Error("Empty array");
            }
            return picker(pool);
        });
    };
}

export function popRandomElement(array) {
    let index = Math.floor(Math.random() * array.length);
    let lastIndex = array.length - 1;
    [array[index], array[lastIndex]] = [array[lastIndex], array[index]];
    return array.pop();
}

export default bufferedPool;
