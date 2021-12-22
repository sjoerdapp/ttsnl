"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../bin/config");
const router = express_1.default.Router();
const key = config_1.apiKey;
router.post('/api1', function (req, res, next) {
    const str = req.body.str;
    const type = req.body.type;
    const languageCode = req.body.languageCode;
    const voiceName = req.body.voiceName;
    const speed = Number(req.body.speed);
    const pitch = Number(req.body.pitch);
    const audioDeviceProfile = Number(req.body.audioDeviceProfile);
    const data = {
        audioConfig: {
            audioEncoding: 'MP3',
            pitch: pitch,
            speakingRate: speed
        },
        input: (type === 'text') ? { text: str } : { ssml: str },
        voice: {
            languageCode: languageCode,
            name: voiceName
        }
    };
    switch (audioDeviceProfile) {
        case 2:
            // @ts-ignore
            data.audioConfig.effectsProfileId = ['wearable-class-device'];
            break;
        case 3:
            // @ts-ignore
            data.audioConfig.effectsProfileId = ['handset-class-device'];
            break;
        case 4:
            // @ts-ignore
            data.audioConfig.effectsProfileId = ['headphone-class-device'];
            break;
        case 5:
            // @ts-ignore
            data.audioConfig.effectsProfileId = ['small-bluetooth-speaker-class-device'];
            break;
        case 6:
            // @ts-ignore
            data.audioConfig.effectsProfileId = ['medium-bluetooth-speaker-class-device'];
            break;
        case 7:
            // @ts-ignore
            data.audioConfig.effectsProfileId = ['large-home-entertainment-class-device'];
            break;
        case 8:
            // @ts-ignore
            data.audioConfig.effectsProfileId = ['large-automotive-class-device'];
            break;
        case 9:
            // @ts-ignore
            data.audioConfig.effectsProfileId = ['telephony-class-application'];
            break;
    }
    axios_1.default
        .post('https://texttospeech.googleapis.com/v1beta1/text:synthesize', data, {
        headers: {
            'X-Goog-Api-Key': key
        }
    })
        .then((response) => {
        res.send(response.data.audioContent);
    })
        .catch(error => {
        res.send(error);
    });
});
router.post('/api2', function (req, res, next) {
    axios_1.default
        .post('https://texttospeech.googleapis.com/v1beta1/text:synthesize', req.body, {
        headers: {
            'X-Goog-Api-Key': key
        }
    })
        .then((response) => {
        res.send(response.data.audioContent);
    })
        .catch(error => {
        res.status(500);
        res.send(error);
    });
});
exports.default = router;
//# sourceMappingURL=api.js.map