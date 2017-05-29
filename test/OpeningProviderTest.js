import OpeningProvider from "../app/modules/OpeningProvider";
import assert from "assert";

describe("OpeningProvider", function() {
    describe("provide", function() {
        it("return data for opening slide", function() {
            const expectedOpening = {
                type: "opening",
                data: {
                    author: "foo",
                    title: "some title",
                },
            };
            OpeningProvider.setUp(
                expectedOpening.data.author,
                expectedOpening.data.title
            );
            const actualOpening = OpeningProvider.provide();
            assert.notEqual(actualOpening, expectedOpening);
            assert.deepEqual(actualOpening, expectedOpening);
        });
    });
});
