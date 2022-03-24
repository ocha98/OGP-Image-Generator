"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.word_break = void 0;
//最大範囲に収まらない長い単語を文字単位に分割
function word_break(ctx, max_width, texts) {
    const text_processed = [];
    for (let i = 0; i < texts.length; ++i) {
        const width = Math.floor(ctx.measureText(texts[i]).width);
        if (width > max_width) {
            text_processed.concat(texts[i].split(""));
            continue;
        }
        text_processed.push(texts[i]);
    }
    return text_processed;
}
exports.word_break = word_break;
