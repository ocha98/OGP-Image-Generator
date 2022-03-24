"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text_split = void 0;
//bufferの後に続く文字が英単語に属するかどうか
function is_english_word(char, buffer) {
    return /^[A-Za-z]+$/.test(char) || (buffer.length > 0 && /^[\-_!?]+$/.test(char));
}
//文字列を英語は単語単位、それ以外は文字単位に分割します
function text_split(text) {
    const splitted = [];
    let word_buffer = "";
    for (let i = 0; i < text.length; ++i) {
        const char = text[i];
        if (is_english_word(char, word_buffer)) {
            word_buffer += char;
            continue;
        }
        if (word_buffer !== "")
            splitted.push(word_buffer);
        word_buffer = "";
        splitted.push(char);
    }
    if (word_buffer !== "") {
        splitted.push(word_buffer);
    }
    return splitted;
}
exports.text_split = text_split;
