(function() {
    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: {
            parent: 'phaser-example',
            width: window.innerWidth,
            height: window.innerHeight,
            mode: Phaser.Scale.RESIZE,//.FIT,
            zoom: -10,
            //resolution: 1,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            // min: {
            //     width: 1500,
            //     height: 1500
            // },
            // max: {
            //     width: 1800,
            //     height: 1800
            // }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var shards;

    var game = new Phaser.Game(config);
    var isSmallScreen = Math.min(window.innerWidth, window.innerHeight) < 460;
    var rx = window.innerWidth/4;
    var ry = window.innerHeight/4;

    var resource = {
        background: "img/background/0.jpg",
        shards: [
            "img/shards/0.png",
            "img/shards/1.png",
            "img/shards/2.png",
            "img/shards/3.png",
            "img/shards/4.png",
        ]
    };
    function preload ()
    {
        var scene = this;
        scene.load.image('background', resource.background);
        resource.shards.forEach(function(x, i) {
            if (isSmallScreen) {
                scene.load.image("sh" + i, x + ".png");
            } else {
                scene.load.image("sh" + i, x);
            }
        });

        //scene.load.audio('a_shard_up', 'audio/noise/');
        scene.load.audio("a_shard_down", ["audio/noise/shard_down.ogg", "audio/noise/a_shard_down.wav"]);
        scene.load.audio("a_completed", ["audio/noise/shard_completed.ogg", "audio/noise/shard_completed.wav"]);
        scene.load.audio("a_victory", ["audio/noise/victory.ogg", "audio/noise/victory.mp3"]);
        scene.load.audio("a_fail", ["audio/noise/fall_from_grace.ogg", "audio/noise/fall_from_grace.wav"]);

        scene.load.audio("a_track", ["audio/music/track_0.ogg", "audio/music/track_0.mp3"]);
    }

    function create ()
    {
        var scene = this;
        var firstVictory = true;
        scene.sound.pauseOnBlur = false; // при потере фокуса на окне музыка продолжает играть

        var a_track = scene.sound.add("a_track", {loop: true, volume: 2.0});
        var bg = scene.add.image(config.width/2, config.height/2, 'background');
        // if (isSmallScreen) {
        //     bg.setScale(0.4, 0.4);
        // }

        var circle = new Phaser.Geom.Circle(config.width/2, config.height/2, isSmallScreen ? 172 : 228);
        var graphics = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.6 } });
        graphics.fillCircleShape(circle);
        //scene.add.image(config.width/2, config.height/2, 'bay');

        shards = scene.add.group();

        var checkCompleted = function(x, y) {
            var mx = Math.abs(x - config.width/2);
            var my = Math.abs(y - config.height/2);
            return (mx*mx + my*my) < 100;
        };

        var shardsLeft = resource.shards.length;

        resource.shards.forEach(function(x, i) {
            var dx = Phaser.Math.Between(-rx, rx);
            var dy = Phaser.Math.Between(-ry, ry);
            var sh = shards.create(config.width/2 + dx, config.height/2 + dy, 'sh' + i);
            sh.tint = 0xaaaaaa;
            sh.setInteractive(scene.input.makePixelPerfect())
                .on('pointerover', function (pointer, gameObject, dragX, dragY) {
                    if (sh.completed) {
                        scene.input.setDraggable(sh);
                    } else {
                        sh.tint = 0xdddddd;
                    }
                })
                .on('pointerout', function (pointer, gameObject, dragX, dragY) {
                    if (sh.completed) {
                        scene.input.setDraggable(sh, false);
                    } else {
                        sh.tint = 0xaaaaaa;
                    }
                })
                .on('pointerdown', function (pointer, gameObject, dragX, dragY) {
                    scene.children.bringToTop(sh);
                    if (sh.completed) {
                        sh.completed = false;
                        if (! sh.input.draggable) {
                            scene.input.setDraggable(sh);
                            sh.x += Phaser.Math.Between(-20, 20);
                            sh.y += Phaser.Math.Between(-20, 20);
                        }
                        //scene.input.setDraggable(sh);
                        //scene.sound.pause("a_track");
                        a_track.pause();
                        //if (shardsLeft == 0) {
                            scene.sound.play("a_fail");
                        //} else {
                        //    scene.sound.play("a_shard_up");
                        //}
                        shardsLeft += 1;
                        shards.children.each(function(x, i) {
                            x.tint = 0xdddddd;
                        });
                    } else {
                        //scene.sound.play("a_shard_up");
                    }
                })
                .on('pointerup', function (pointer, dragX, dragY) {
                    if (sh.completed) {} else {
                        if (checkCompleted(sh.x, sh.y)) {
                            sh.completed = true;
                            sh.x = config.width/2;
                            sh.y = config.height/2;
                            //scene.input.setDraggable(sh, false);
                            //shards.children.sendToBack(sh);
                            scene.children.moveDown(sh);
                            scene.children.moveDown(sh);
                            scene.children.moveDown(sh);
                            scene.children.moveDown(sh);
                            shardsLeft -= 1;
                            if (shardsLeft == 0) {
                                if (firstVictory) {
                                    scene.sound.play("a_victory", {volume: 0.5});
                                    firstVictory = false;
                                } else {
                                    scene.sound.play("a_completed");
                                }
                                if (!a_track.isPlaying && !a_track.isPaused) {
                                    a_track.play({delay: 2});
                                } else {
                                    a_track.resume();
                                }
                                shards.children.each(function(x, i) {
                                    x.tint = 0xffffff;
                                });
                            } else {
                                scene.sound.play("a_completed");
                            }
                        } else {
                            scene.sound.play("a_shard_down");
                        }
                    }
                });
            scene.input.setDraggable(sh);
        });
        
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }
    function update ()
    {
    }
})();