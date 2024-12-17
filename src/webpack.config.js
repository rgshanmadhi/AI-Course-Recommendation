module.exports = {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        querystring: require.resolve("querystring-es3"),
        zlib: require.resolve("browserify-zlib"),
        url: require.resolve("url"),
        buffer: require.resolve("buffer/"),
        util: require.resolve("util/"),
        fs: false, // Since fs is a server-side module, we generally set it to false
      }
    }
  };
  