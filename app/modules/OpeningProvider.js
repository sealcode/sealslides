const OpeningProvider = {
    props: { type: "opening" },
    setUp(author, title) {
        let data = {
            author: author,
            title: title,
        };
        OpeningProvider.props.data = data;
    },
    provide() {
        return Object.assign({}, OpeningProvider.props);
    },
};

export default OpeningProvider;
