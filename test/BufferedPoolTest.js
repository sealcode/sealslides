import BufferedPool, { popRandomElement } from "../app/modules/BufferedPool";
import assert from "assert";

describe("BufferedPool", function() {
    describe("popRandomElement", function() {
        it("Correctly buffers and pops random elements", function() {
            const pool = BufferedPool(rangeGetter(0, 20), popRandomElement),
                promises = [];
            for (let i = 0; i < 20; ++i) {
                promises.push(pool());
            }
            const expectedSum = (19 * 19 + 19) / 2;
            return Promise.all(promises).then(elements => {
                const actualSum = elements.reduce((sum, el) => sum + el, 0);
                assert.equal(actualSum, expectedSum);
                assert.notDeepEqual(elements, range(0, 20));
            });
        });
        it("Throws error when pool is too small", function() {
            const pool = BufferedPool(rangeGetter(0, 9), popRandomElement),
                promises = [];
            for (let i = 0; i < 10; ++i) {
                promises.push(pool());
            }
            return assertIsErrorThrown(Promise.all(promises));
        });
        it("Throws error when getter returns empty array", function() {
            const pool = BufferedPool(
                () => Promise.resolve([]),
                popRandomElement
            );
            return assertIsErrorThrown(pool());
        });
    });

    function rangeGetter(min, max) {
        return function() {
            return Promise.resolve(range(min, max));
        };
    }

    function range(min, max) {
        const res = [];
        for (let i = min; i < max; ++i) {
            res.push(i);
        }
        return res;
    }

    function assertIsErrorThrown(promise) {
        let errorMsg;
        return promise
            .catch(err => {
                errorMsg = err;
                return err;
            })
            .then(err => assert.equal(err, errorMsg));
    }
});
