"use strict";

function MockPlayZone(info) {
    this.info = info;
}

MockPlayZone.prototype.create = function (parent) {
    console.log("Create play zone");
    this.info.innerHTML = "create pz";
};

MockPlayZone.prototype.run = function () {
    console.log("Run play zone");
    this.next();
};

MockPlayZone.prototype.next = function() {
    console.log("Play zone: next");
    this.info.innerHTML = "next";
};

MockPlayZone.prototype.previous = function() {
    console.log("Play zone: previous");
    this.info.innerHTML = "previous";
};

function PlayerConfig(type, url, thumbnailUrl, minDuration) {
    this.type = type;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl || null;
    this.minDuration = minDuration || null;
}
