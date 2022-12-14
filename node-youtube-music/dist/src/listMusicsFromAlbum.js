"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMusicsFromAlbum = exports.parseListMusicsFromAlbumBody = void 0;
const got_1 = require("got");
const context_1 = require("./context");
const parsers_1 = require("./parsers");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseListMusicsFromAlbumBody = (body) => {
    const { contents, } = body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].musicShelfRenderer;
    const songs = [];
    const { thumbnailUrl, artist, album } = parsers_1.parseAlbumHeader(body.header);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contents.forEach((element) => {
        var _a;
        try {
            const song = parsers_1.parseMusicInAlbumItem(element);
            if (song) {
                song.album = album;
                if (((_a = song.artists) === null || _a === void 0 ? void 0 : _a.length) === 0)
                    song.artists = [{ name: artist }];
                song.thumbnailUrl = thumbnailUrl;
                songs.push(song);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
    return songs;
};
exports.parseListMusicsFromAlbumBody = parseListMusicsFromAlbumBody;
function listMusicsFromAlbum(albumId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield got_1.default.post('https://music.youtube.com/youtubei/v1/browse?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30', {
            json: Object.assign(Object.assign({}, context_1.default.body), { browseId: albumId }),
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                origin: 'https://music.youtube.com',
            },
        });
        try {
            return exports.parseListMusicsFromAlbumBody(JSON.parse(response.body));
        }
        catch (e) {
            console.error(e);
            return [];
        }
    });
}
exports.listMusicsFromAlbum = listMusicsFromAlbum;
