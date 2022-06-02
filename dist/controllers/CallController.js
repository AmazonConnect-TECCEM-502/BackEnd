"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = __importDefault(require("./AbstractController"));
const AWS = __importStar(require("aws-sdk"));
const config_1 = require("../config");
class CallController extends AbstractController_1.default {
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new CallController("call");
        return this.instance;
    }
    initRoutes() {
        this.router.get("/getCalls", this.getVideos.bind(this));
        this.router.post("/uploadCall", this.postUploadVideo.bind(this));
    }
    getVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                AWS.config.update({
                    accessKeyId: config_1.AWS_S3_ACCESS_KEY_ID,
                    secretAccessKey: config_1.AWS_S3_SECRET_ACCESS_KEY,
                    region: config_1.AWS_REGION,
                });
                const { fileName, file } = req.body;
                const params = {
                    Bucket: config_1.AWS_S3_BUCKET,
                    Key: fileName,
                    Body: file,
                };
                const s3 = new AWS.S3();
                s3.listObjects(params, function (err, data) {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    }
                    else {
                        res.status(200).send(data.Contents);
                    }
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    postUploadVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                AWS.config.update({
                    accessKeyId: config_1.AWS_S3_ACCESS_KEY_ID,
                    secretAccessKey: config_1.AWS_S3_SECRET_ACCESS_KEY,
                    region: config_1.AWS_REGION,
                });
                const fileName = req.body.fileName;
                const blob = req.body.blob;
                const params = {
                    Bucket: config_1.AWS_S3_BUCKET,
                    Key: fileName,
                    Body: blob,
                };
                const s3 = new AWS.S3();
                s3.putObject(params, function (err, data) {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    }
                    else {
                        res.status(201).json({ message: data });
                    }
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
}
exports.default = CallController;
//# sourceMappingURL=CallController.js.map