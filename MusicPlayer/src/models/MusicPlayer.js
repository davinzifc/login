class musicPlayer {
	constructor(songName,artistName,src) {
		this.player = new Audio(src);
		this.initDOMElement(songName,artistName);
	
		this.controlPanel = this.DOMElement.querySelector("#control-panel");
		this.infoBar = this.DOMElement.querySelector("#info");
		this.progressBar = this.infoBar.querySelector(".progress-bar");
		this.progressBar.onclick = (e) => {
			console.log(e);
			let pos = e.offsetX;
			let total = e.target.clientWidth;
			let p = (pos / total);
			this.player.currentTime = this.player.duration * p;
		}

		this.playBtn = this.DOMElement.querySelector("#play");
		this.playBtn.onclick = () => { this.play() };

		this.player.ontimeupdate = () => { this.updateData() };

	}

	set DOMElement(value){
		this._DOMElement = value;
	}

	get DOMElement(){
		return this._DOMElement;
	}


	initDOMElement(songName,artistName){
		let containerAll = document.createElement("div");
		containerAll.classList.add("containerAll");

		let playList = this._playListDomElement();
		containerAll.appendChild(playList);

		let container = document.createElement("div");
		container.classList.add("musicPlayer");
		containerAll.appendChild(container);

		let playerList = this._playListDomElement1();
		containerAll.appendChild(playerList);
		
		let prevSong = this._prevAndNextDomElement(true,"assets/covers/virtualscape.jpg");
		container.appendChild(prevSong);

		let player = this._playerDomElement(songName,artistName);
		container.appendChild(player);

		let nextSong = this._prevAndNextDomElement(false,"assets/covers/virtualscape.jpg");
		container.appendChild(nextSong);


		this.DOMElement = containerAll;
	}

	_prevAndNextDomElement(isPrev, src){
		let element = document.createElement("div");
		element.id = (isPrev) ? "prevSong" : "nextSong";

		var wall = document.createElement("div");
		wall.classList.add("wall");

		var img = document.createElement("img");
		img.src = src;

		element.appendChild(wall);
		element.appendChild(img);

		return element;
	}



	_playListDomElement(/*namePlays, autor, url*/){
		let boxContainer = document.createElement("div");
		boxContainer.classList.add("boxContainer");

		let headerBox = document.createElement("div");
		headerBox.classList.add("headerBox");
		boxContainer.appendChild(headerBox);

		let boxPlay = document.createElement("div");
		boxPlay.classList.add("boxPlay");

		return boxContainer;
	}

	_playListDomElement1(/*namePlays, autor, url*/){
		let boxContainer = document.createElement("div");
		boxContainer.classList.add("boxContainer1");

		let headerBox = document.createElement("div");
		headerBox.classList.add("headerBox");
		boxContainer.appendChild(headerBox);

		let boxPlay = document.createElement("div");
		boxPlay.classList.add("boxPlay");

		return boxContainer;
	}

	

	_playerDomElement(nameContent,artistContent){


		let player = document.createElement("div");
		player.classList.add("player");

		let info = document.createElement("div");
		info.classList.add("info");
		info.id = "info";

		let artist = document.createElement("span");
		artist.classList.add("artist");
		artist.innerHTML = artistContent;

		let name = document.createElement("span");
		name.classList.add("name");
		name.innerHTML = nameContent;

		let progressBar = document.createElement("div");
		progressBar.classList.add("progress-bar");

		let bar = document.createElement("span");
		bar.classList.add("bar");

		progressBar.appendChild(bar);
		info.appendChild(artist);
		info.appendChild(name);
		info.appendChild(progressBar);
		player.appendChild(info);

		let controlPanel = this._controlPanelDomElement();
		player.appendChild(controlPanel);

		let timeBox = document.createElement("div");
		timeBox.classList.add("timeBox");

		let timeCurrent = document.createElement("span");
		timeCurrent.classList.add("time-current");
		let timeTotal = document.createElement("span");
		timeTotal.classList.add("time-total");

		timeBox.appendChild(timeCurrent);
		timeBox.appendChild(timeTotal);
		info.appendChild(timeBox);

		return player;
	}

	_controlPanelDomElement(){
		let controlPanel = document.createElement("div");
		controlPanel.id = "control-panel";
		controlPanel.classList.add("control-panel");

		let albumArt = document.createElement("div");
		albumArt.classList.add("album-art");

		let controls = document.createElement("div");
		controls.classList.add("controls");

		let prev = document.createElement("div");
		prev.classList.add("prev");

		let play = document.createElement("div");
		play.classList.add("play");
		play.id = "play";

		let next = document.createElement("div");
		next.classList.add("next");

		controls.appendChild(prev);
		controls.appendChild(play);
		controls.appendChild(next);

		controlPanel.appendChild(albumArt);
		controlPanel.appendChild(controls);

		return controlPanel;
	}

	play() {
		this.controlPanel.classList.toggle('active');
		this.infoBar.classList.toggle('active');
		if(this.player.paused){
			this.player.play();
		}else{
			this.player.pause();
		}
	}

	updateData(){
		let p = (this.player.currentTime / this.player.duration) * 100;
		let bar = this.progressBar.querySelector(".bar");
		bar.style.width = `${p}%`

		let timeCurrent = this.DOMElement.querySelector(".player .info .timeBox .time-current");
		let timeTotal = this.DOMElement.querySelector(".player .info .timeBox .time-total");

		let seg = Math.floor(this.player.currentTime%60);
		let min = Math.floor(this.player.currentTime/60);

		if(seg < 10){
			timeCurrent.innerHTML = `${min}:0${seg}`;
		}else{
			timeCurrent.innerHTML = `${min}:${seg}`;
		}
		if(this.player.duration%60 < 10){
			timeTotal.innerHTML = `${Math.floor(this.player.duration/60)}:0${Math.floor(this.player.duration%60)}`;
		}else{
			timeTotal.innerHTML = `${Math.floor(this.player.duration/60)}:${Math.floor(this.player.duration%60)}`;
		}
		
	}
}
