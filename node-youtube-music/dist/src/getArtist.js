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
exports.getArtist = void 0;
const got_1 = require("got");
const context_1 = require("./context");
const parsers_1 = require("./parsers");
// eslint-disable-next-line import/prefer-default-export
function getArtist(artistId, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield got_1.default.post('https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30', {
            json: Object.assign(Object.assign({}, context_1.default.body), { browseId: artistId }),
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                'Accept-Language': (_a = options === null || options === void 0 ? void 0 : options.lang) !== null && _a !== void 0 ? _a : 'en',
                origin: 'https://music.youtube.com',
            },
        });
        try {
            return parsers_1.parseArtistData(JSON.parse(response.body), artistId);
        }
        catch (e) {
            console.error(e);
            return {};
        }
    });
}
exports.getArtist = getArtist;
