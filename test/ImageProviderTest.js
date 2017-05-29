import ImageProvider from "../app/modules/ImageProvider";
import assert from "assert";

describe("ImageProvider", function() {
    describe("provide", function() {
        it("return images when query is not defined", function() {
            const expectedResources = range(1, 50);
            ImageProvider._getGetterOfImageResources = makeMockGetter(
                expectedResources
            );
            ImageProvider.setUp();
            const promises = ImageProvider.provide(20);
            return assertImagesAreUnique(promises, expectedResources);
        });
        it("return images when query is defined", function() {
            const expectedResources = range(51, 100);
            ImageProvider._getGetterOfImageResources = makeMockGetter(
                expectedResources
            );
            ImageProvider.setUp();
            const promises = ImageProvider.provide(20);
            return assertImagesAreUnique(promises, expectedResources);
        });
    });

    function makeMockGetter(resources) {
        const expectedRequestParams = ImageProvider._prepareRequestParams();
        return function(requestParams) {
            assert.deepEqual(requestParams, expectedRequestParams);
            return () => Promise.resolve(resources);
        };
    }

    function assertImagesAreUnique(promises, expectedResources) {
        const expectedImages = expectedResources.map(
            resource => ImageProvider._extractImage(resource).data
        );
        return Promise.all(promises).then(actualImages => {
            for (let actualImage of actualImages) {
                assert.equal("image", actualImage.type);
                assert.ok(expectedImages.includes(actualImage.data));
                assert.equal(
                    actualImages.indexOf(actualImage),
                    actualImages.lastIndexOf(actualImage)
                );
            }
        });
    }

    function range(min, max) {
        const res = [];
        for (let i = min; i < max; ++i) {
            res.push({ webformatURL: i });
        }
        return res;
    }
});
