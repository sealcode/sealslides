import config from "../config/config";
import BufferedPool, { popRandomElement } from "./BufferedPool";
import axios from "axios";

const ImageProvider = {
    _requestUrl: "https://pixabay.com/api/",
    setUp(imageQuery = "") {
        ImageProvider._imageQuery = imageQuery;
        ImageProvider._imageResourcesPool = this._makeResourcePool();
    },
    _makeResourcePool() {
        const requestParams = ImageProvider._prepareRequestParams();
        const getter = this._getGetterOfImageResources(requestParams);
        return BufferedPool(getter, popRandomElement);
    },
    provide(noOfRequiredItems) {
        const imagePromises = [];
        for (let i = 0; i < noOfRequiredItems; ++i) {
            let promise = ImageProvider._imageResourcesPool().then(
                this._extractImage
            );
            imagePromises.push(promise);
        }
        return imagePromises;
    },
    _prepareRequestParams() {
        const requestParams = {
            params: {
                key: config.pixabayApiKey,
                per_page: config.pixabayPageLength,
            },
        };
        if (ImageProvider._imageQuery) {
            requestParams.params.q = ImageProvider._imageQuery;
        }
        return requestParams;
    },
    _getGetterOfImageResources(requestParams) {
        return () =>
            axios
                .get(ImageProvider._requestUrl, requestParams)
                .then(requestResult => requestResult.data.hits);
    },
    _extractImage(resource) {
        return {
            type: "image",
            data: resource.webformatURL,
        };
    },
};

export default ImageProvider;
