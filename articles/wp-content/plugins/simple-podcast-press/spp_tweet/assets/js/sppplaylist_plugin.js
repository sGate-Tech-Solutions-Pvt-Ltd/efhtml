(function() {

    tinymce.create('tinymce.plugins.SPPPlaylist', {

        init: function(ed, url) {

            ed.addButton('sppplaylist', {

                title: 'SPP: Playlist Shortcode',

                image: url.replace("/js", "") + '/img/spp-playlists.png',

                onclick: function() {

                    ed.selection.setContent('[spp-playlist]');

                }

            });

        },

        createControl: function(n, cm) {

            return null;

        },

        getInfo: function() {

            return {

                longname: "Player Playlist Shortcode : Simple Podcast Press",

                author: 'HaniMourra',

                authorurl: 'http://simplepodcastpress.com/',

                infourl: 'http://simplepodcastpress.com/',

                version: "1.0"

            };

        }

    });

    tinymce.PluginManager.add('sppplaylist', tinymce.plugins.SPPPlaylist);

})();