var fs = require('fs');
var path = require('path');

var diretoryTreeToObj = function(dir, done, DepthNum = 1, recDepth = 2) {
    var results = [];

    fs.readdir(dir, function(err, list) {
        if (err){
            return done(err);}

        list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        var pending = list.length;
        
        //Stops the depth recurstion
        if (DepthNum > recDepth ){ return done(null, []); }


        if (!pending){
            return done(null, {name: path.basename(dir), 
                                type: 'folder', 
                                path: dir,
                                children: results, 
                                depth: DepthNum});}

      
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            type: 'folder',
                            path: file,
                            children: res,
                            depth: DepthNum
                        });
                        if (!--pending)
                            done(null, results);
                    }, DepthNum+1, recDepth);
                }
                else {
                    results.push({
                        name: path.basename(file),
                        path: file,
                        type: 'file',
                        depth: DepthNum
                    });
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};

module.exports = { diretoryTreeToObj };
