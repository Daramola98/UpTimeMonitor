const controllers = require('./controllers');

function requestRouter(){
    return {
        'sample': controllers.sample,
        'notFound': controllers.notFound
    }
}

module.exports = requestRouter();
