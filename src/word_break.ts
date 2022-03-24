//最大範囲に収まらない長い単語を文字単位に分割
export function word_break(ctx: CanvasRenderingContext2D, max_width: number, texts: string[]): string[] {
    const text_processed: string[] = []
    for (let i = 0; i < texts.length; ++i) {
        const width = Math.floor(ctx.measureText(texts[i]).width)

        if (width > max_width) {
            text_processed.concat(texts[i].split(""))
            continue;
        }

        text_processed.push(texts[i])
    }
    return text_processed
}