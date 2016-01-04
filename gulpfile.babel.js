"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import jsonServer from "json-server";

const CONFIG = { 
  port : 3000,
  host : "localhost"
}

gulp.task("transpile", () => {

 return browserify("src/app.js")
  .transform("babelify")
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(gulp.dest("dist"));
});

gulp.task("watch",["transpile"], () => {
  gulp.watch("src/**/*.js", ["transpile"]);
});

gulp.task("server", () => {
  let router = jsonServer.router(__dirname + "/server/db.json");
  jsonServer.create()
        .use(jsonServer.defaults())
        .use(router)
        .listen(CONFIG.port,
                CONFIG.host, 
                () => { 
	          console.log(` Server runnig on ${CONFIG.host}:${CONFIG.port}`) 
                });
});

gulp.task("default",["watch"]);

