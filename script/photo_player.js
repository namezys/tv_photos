"use strict";

function PhotoPlayer(config, playZone) {
    this.config = config;
    this.playZone = playZone;

    this.timer = null;
}

PhotoPlayer.prototype.createView = function(view) {
    view.style.backgroundImage = "url('" + this.config.url + "')";
    view.style.backgroundRepeat = "no-repeat";
    view.style.backgroundSize = "contain";
    view.style.backgroundPosition = "center center";
};

PhotoPlayer.prototype.start = function() {
    this.stop();
    console.log("Start photo player");
    var t = this;
    this.timer = setTimeout(function () { t.onNext(); }, this.config.minDuration * 1000);
};

PhotoPlayer.prototype.stop = function() {
    console.log("Stop photo player");
    if (this.timer)
        clearTimeout(this.timer);
    this.timer = null;
};

PhotoPlayer.prototype.onNext = function() {
    console.log("Photo player onNext");
    this.stop();
    this.playZone.next();
};

PhotoPlayer.prototype.onPrevious = function() {
    console.log("Photo player onPrevious");
    this.stop();
    this.playZone.previous();
};

PhotoPlayer.prototype.showMeta = function() {
    console.log("Show meta for image");
    return null;
};

PhotoPlayer.prototype.showControl = function() {
    console.log("Photo player don't have control");
    return null;
};
