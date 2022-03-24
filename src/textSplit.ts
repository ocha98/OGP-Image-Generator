//bufferの後に続く文字が英単語に属するかどうか
function is_english_word(char: string, buffer: string) {
    return /^[A-Za-z]+$/.test(char) || (buffer.length > 0 && /^[\-_!?]+$/.test(char))
}

//文字列を英語は単語単位、それ以外は文字単位に分割します
export function text_split(text: string): string[] {
    const splitted: string[] = []
    let word_buffer: string = ""

    for (let i = 0; i < text.length; ++i) {
        const char = text[i]
        if (is_english_word(char, word_buffer)) {
            word_buffer += char
            continue
        }

        if (word_buffer !== "") splitted.push(word_buffer)
        word_buffer = ""
        splitted.push(char)
    }

    if (word_buffer !== "") {
        splitted.push(word_buffer)
    }

    return splitted
}