var express = require('express');

var authority = express(),
      reader = express(),
      generator = express();

/** Require all of the servers  */

require("./server/authority.server")(authority);
require('./server/reader.server')(reader);
require('./server/generator.server')(generator);