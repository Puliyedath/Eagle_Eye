module.exports = {
    db: 'mongodb://localhost/sfMovieLocations',
    port: process.env.PORT || 3000, //this is a dev setup
    USECACHE: process.env.USECACHE || false  //this falg decides whether data needs to be queries from the external api or the cache
};
