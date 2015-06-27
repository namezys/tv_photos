"use strict";

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

function VideoPlayer(config, playZone) {
    this.config = config;
    this.playZone = playZone;

    this.timer = null;
}

VideoPlayer.prototype.createView = function(view) {
    view.innerHTML = '<video style="display: block; width: 100%; height: 100%">\
        <source src="{0}">\
        </video>\
        <div style="position: absolute; margin: 15px; top: 0; visibility: hidden;">\
            <p>url: {0}</p>\
            <p>thumbnail: {1}</p>\
        </div>\
        '.format(this.config.url, this.config.thumbnailUrl);

    this.video = view.querySelector("video");
    if (this.config.thumbnailUrl)
        this.video.setAttribute("poster", this.config.thumbnailUrl);
    this.metaView = view.querySelector("div");
};

VideoPlayer.prototype.start = function() {
    this.stop();
    console.log("Start video player");
    this.video.currentTime = 0;
    this.video.play();
    var t = this;
    this.video.onended = function () {
        console.log("End video");
        var wait = t.config.minDuration - t.video.duration;
        if (wait > 0) {
            console.log("Wait more", wait);
            t.timer = setTimeout(function () { t.onNext(); }, wait * 1000);
        } else {
            t.onNext();
        }
    };
};

VideoPlayer.prototype.stop = function() {
    console.log("Stop video player");
    if (this.timer)
        clearTimeout(this.timer);
    this.timer = null;
    this.video.pause();
};

VideoPlayer.prototype.onNext = function() {
    console.log("Video player onNext");
    this.stop();
    this.playZone.next();
};

VideoPlayer.prototype.onPrevious = function() {
    console.log("Video player onPrevious");
    this.stop();
    this.playZone.previous();
};

VideoPlayer.prototype.showMeta = function() {
    console.log("Show meta for video");
    this.metaView.style.visibility = "visible";
    return this.metaView;
};

VideoPlayer.prototype.showControl = function() {
    console.log("Video player controller");
    this.video.controls = true;
    return this.video.controller;
};
