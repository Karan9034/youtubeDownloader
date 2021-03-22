const ytdl = require('ytdl-core');
const fs = require('fs');

url = 'https://www.youtube.com/watch?v=rUWxSEwctFU'
ytdl(url, {
	filter: format => format.container === 'mp4'
}).pipe(fs.createWriteStream('video.mp4'));