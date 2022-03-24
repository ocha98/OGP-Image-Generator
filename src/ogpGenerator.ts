import { Canvas, createCanvas, loadImage } from 'canvas'
import { text_split } from './textSplit'
import { word_break } from './word_break'
import * as fs from 'fs'

//描画時の文字列のwidthとheightを取得
function text_size(ctx: CanvasRenderingContext2D, text: string): { width: number, height: number } {
    const measure = ctx.measureText(text)
    const width: number = Math.floor(measure.width)
    const height: number = Math.floor(measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent)
    return { width, height }
}

//描画するテキストを1行づつ作成
function create_text_lines(ctx: CanvasRenderingContext2D, max_width: number, texts: string[]): string[] {
    const text_lines: string[] = []
    let line_buffer: string = ""

    for (let i = 0; i < texts.length; ++i) {
        const next_text_width = text_size(ctx, line_buffer + texts[i]).width
        if (next_text_width > max_width) {
            text_lines.push(line_buffer)
            line_buffer = ""
        }
        line_buffer += texts[i]
    }

    if (line_buffer !== "") {
        text_lines.push(line_buffer)
    }
    return text_lines
}

// 文字列をcanvasに描画します
function text_draw(x: number, y: number, ctx: CanvasRenderingContext2D, max_width: number, text: string, font: string, line_space: number, align: CanvasTextAlign): void {
    ctx.textAlign = align
    ctx.textBaseline = "middle"
    ctx.font = font

    const text_splitted = word_break(ctx, max_width, text_split(text))
    const text_lines = create_text_lines(ctx, max_width, text_splitted)
    const text_hight = text_size(ctx, text).height + line_space

    let y_offset = -1 * (text_hight / 2) * (text_lines.length - 1)
    for (let i = 0; i < text_lines.length; ++i) {
        ctx.fillText(text_lines[i], x, y + y_offset)
        y_offset += text_hight
    }
}

//オプションが設定されてなければデフォルト値を割り当てる
function option_setup(options:Options):Options{
    const text_align: CanvasTextAlign = options.text_align !== undefined ? options.text_align : "center"
    const font: string = options.font !== undefined ? options.font : "48px sans-serif"
    const padding_x: number = options.padding_x !== undefined ? options.padding_x : 0
    const line_space: number = options.line_space !== undefined ? options.line_space : 0
    const jpg: boolean = options.jpg !== undefined ? true : false
    return {text_align, font, padding_x, line_space, jpg}
}

//画像を書き出す
function writer(ogp_canvas: Canvas, out_jpg: boolean, save_file_path: string){
    let buffer = ogp_canvas.toBuffer("image/png")
    if (out_jpg) {
        buffer = ogp_canvas.toBuffer("image/jpeg")
    }
    fs.writeFileSync(save_file_path, buffer)
}

export async function ogp_generator(save_file_path: string, back_img_path: string, text: string, options: Options = {}) {
    const {text_align, font, line_space, jpg, padding_x} = option_setup(options)

    const img = await loadImage(back_img_path)
    const ogp_canvas = createCanvas(img.width, img.height)
    const ctx = ogp_canvas.getContext("2d")

    ctx.drawImage(img, 0, 0)

    const max_width = img.width - padding_x * 2;

    const text_y = img.height / 2
    let text_x = img.width / 2
    if (text_align === "left") {
        text_x = padding_x
    }
    if (text_align === "right") {
        text_x = img.width - padding_x
    }

    text_draw(text_x, text_y, ctx, max_width, text, font, line_space, text_align)

    writer(ogp_canvas, jpg, save_file_path)
}