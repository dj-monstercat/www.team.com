if (typeof dubtrackBotEnabled === "undefined" || dubtrackBotEnabled === null) {
        dubtrackBotEnabled = true;
        var menuExists = false;
        function addMenuItem(onState, offState, onclick, id, changeTo) {
        //should probably make 2 functions, lazy atm
                var text1 = document.createTextNode(onState);
                var text2 = document.createTextNode(offState);
                if (!menuExists) {
                        var menu = document.createElement("a");
                        var att = document.createAttribute("id");
                        var att2 = document.createAttribute("onclick");
                        att.value = id;
                        att2.value = onclick;
                        menu.appendChild(text1);
                        document.getElementById("main-menu-left").appendChild(menu);
                } else {
                        document.getElementById(id).replaceChild(text1, text2);
                        var att = document.createAttribute("onclick");
                        att.value = changeTo;
                        menu.setAttributeNode(att);
                }
        }
        addMenuItem("Auto-UpDub", "Stop Auto-UpDubbing", "AutoDub();", "auto-dub-item",null);
        addMenuItem("Song Updates","Stop Song Updates","SongUpdates();", "song-update-item",null);
        var autoDub,songUpdates;
        function AutoDub() {
                addMenuItem(null, null, null, "auto-dub-item", "StopAutoDub();");
                var songid = Dubtrack.room.player.activeSong.attributes.song.songid;
                var autoDub = setInterval(function () {
                        var songId = Dubtrack.room.player.activeSong.attributes.song.songid;
                        if (songid !== songId) {
                                songid = songId;
                                Dubtrack.playerController.voteUpAction();
                        }
                }, 100);
        }
        function StopAutoDub() {
                addMenuItem(null, null, null, "auto-dub-item", "AutoDub();");
                clearInterval(autoDub);
        }
        function SongUpdates() {
                addMenuItem(null, null, null, "song-update-item", "StopSongUpdates();");
                var dj = Dubtrack.room.player.activeSong._previousAttributes.song._user,
                        song = Dubtrack.room.player.activeSong._previousAttributes.song._id;
                songUpdates = setInterval(function () {
                        var currentDj = Dubtrack.room.player.activeSong._previousAttributes.song._user,
                                currentSong = Dubtrack.room.player.activeSong._previousAttributes.song._id;
                        if (currentDj !== dj || currentSong !== song) {
                                var message = Dubtrack.room.player.currentDjName.text() + ":" + Dubtrack.room.player.activeSong._previousAttributes.songInfo.name;
                                var messageJSON = new Dubtrack.Model.chat({
                                        user: JSON.parse('{"username":"dtbot","status":1,"roleid":1,"dubs":0,"created":1445822278697,"lastLogin":0,"userInfo":{"_id":"562d7f478e9cd10e00edfe07","userid":"562d7f478e9cd10e00edfe06","__v":0},"_id":"562d7f478e9cd10e00edfe06","profileImage":{"public_id":"qsaizgnbjjme8kpmb3ac","version":1447028797,"width":150,"height":150,"format":"png","resource_type":"image","tags":[],"bytes":1862,"type":"upload","etag":"ec13c8ac397b4880abed441e2b8885d0","url":"http://res.cloudinary.com/hhberclba/image/upload/v1447028797/qsaizgnbjjme8kpmb3ac.png","secure_url":"https://res.cloudinary.com/hhberclba/image/upload/v1447028797/qsaizgnbjjme8kpmb3ac.png"},"__v":0}'),
                                        message: message,
                                        time: Date.now(),
                                        realTimeChannel: Dubtrack.room.model.get("realTimeChannel"),
                                        type: "chat-message"
                                });
                                Dubtrack.room.chat.appendItem(messageJSON);
                                dj = currentDj;
                                song = currentSong;
                        }
                }, 100);
        }
        function StopSongUpdates() {
                addMenuItem(null, null, null, "song-update-item", "SongUpdates();");
                clearInterval(songUpdates);
        }
}
