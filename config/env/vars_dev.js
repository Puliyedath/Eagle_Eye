module.exports = {
    db: 'mongodb://localhost/sfMovieLocations',
    port: process.env.PORT || 3000, //this is a dev setup
    useCache: process.env.USECACHE  //this falg decides whether data needs to be queries from the external api or the cache
};
