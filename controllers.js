function controllers(){
    const sample = (data, callback) => {
        callback(406, { 'name': 'Sample Handler' })
    };

    const notFound = (data, callback) => {
        callback(404);
    }

    return {
        sample,
        notFound
    }
}

module.exports = controllers();