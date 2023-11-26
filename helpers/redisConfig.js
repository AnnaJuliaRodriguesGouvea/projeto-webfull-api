let cache = require('express-redis-cache');

cache = cache({
    prefix: process.env.PREFIX_REDIS,
    url: `${process.env.CONTAINER_NAME}://${process.env.HOST_REDIS}:${process.env.PORT_REDIS}`
})

cache.invalidate = () => {
    return (req, res, next) => {
        const route_name = `${req.originalUrl}?*`;
        if(!cache.connected) {
            next();
            return;
        }
        cache.del(route_name, (err) => {
            if (err) {
                console.error(`Error invalidating cache for route ${route_name}: ${err}`);
            } else {
                console.log(`Cache invalidated for route: ${route_name}`);
            }
        });
        next()
    }
}

module.exports = cache;
