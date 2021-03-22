const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const dialog = require('electron').remote.dialog

const btn = document.getElementById('btn');
var warn = document.getElementById('warning');
var input_url = document.getElementById('url');
const expression = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}'
var regex = new RegExp(expression);


btn.addEventListener('click', (e) => {
	e.preventDefault()
	var url = input_url.value
	console.log(url)
	if(url === ''){
		warn.innerHTML = "<p class='text-danger'>Enter a valid URL<p>";
	}
	else{
		if(url.match(regex)){
			warn.innerHTML = "";
			dialog.showSaveDialog({
				title: 'Download video',
				buttonLabel: 'Download',
				defaultPath: path.join(__dirname),
				filters:[{name: 'Movies', extensions: ['mp4']}]
			}).then(file => {
				if(!file.canceled) {
					ytdl(url, {
						filter: format => format.container === 'mp4'
					}).pipe(fs.createWriteStream(file.filePath.toString()));
					console.log('finished')
				}
			})
		}
		else {
			warn.innerHTML = "<p class='text-danger'>URL should start with http:// or https://</p>"
		}
	}
});