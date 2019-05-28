System.register("index", ["express"], function (exports_1, context_1) {
    "use strict";
    var express, app;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (express_1) {
                express = express_1;
            }
        ],
        execute: function () {
            app = express();
            app.get('/', function (req, res) {
                res.send('Hello World!')
                    .status(200);
            });
            app.listen(4000, function () {
                console.log('Example app listening on port 3000!');
            });
        }
    };
});
//# sourceMappingURL=server.js.map