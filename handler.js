'use strict';
import app from ".";
import ServerlessHttp from "serverless-http";
module.exports.hello = ServerlessHttp(app);
