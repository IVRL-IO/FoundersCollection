const path = require("path");
const fs = require("fs");
module.exports = function (grunt) {

    grunt.initConfig({});
    grunt.registerTask(
        'Copy Index.html',
        'Duplicates /1/index.html to /2/-/11/. We don\'t use server side rendering / htaccess so no redirect to common index. Corrects old filenames.',
        function () {
            for (let i = 0; i != 11; i++) {
                let tokenId = (i + 1).toString();
                grunt.file.copy('1/index.html', path.join(tokenId, "index.html"));
                if (grunt.file.isDir(tokenId)) {
                    let oldImageName = path.join(
                        tokenId,
                        `${tokenId}.png`);
                    let oldThumbnailName = path.join(
                        tokenId,
                        `${tokenId}.Thumbnail.png`);
                    let oldMetadataName = path.join(
                        tokenId,
                        `${tokenId}.json`);
                    if (grunt.file.exists(oldImageName)) {
                        fs.rename(oldImageName, path.join(tokenId, 'image.png'), function (err) {
                            if (err) {
                                grunt.log.error(`File "${oldImageName}" failed to rename.`);
                            }

                            grunt.log.ok(`File "${oldImageName}" renamed correctly to "image.png"`);
                        });
                    }

                    if (grunt.file.exists(oldThumbnailName)) {
                        fs.rename(oldThumbnailName, path.join(tokenId, 'thumbnail.png'), function (err) {
                            if (err) {
                                grunt.log.error(`File "${oldThumbnailName}" failed to rename.`);
                            }

                            grunt.log.ok(`File "${oldThumbnailName}" renamed correctly to "thumbnail.png"`);
                        });
                    }
                    if (grunt.file.exists(oldMetadataName)) {
                        fs.rename(oldMetadataName, path.join(tokenId, 'metadata.json'), function (err) {
                            if (err) {
                                grunt.log.error(`File "${oldMetadataName}" failed to rename.`);
                            }

                            grunt.log.ok(`File "${oldMetadataName}" renamed correctly to "metadata.json"`);
                        });
                    }
                }
            }
        });
}