
//ボードのサイズ
const blockSize = 30;
const boardRow = 20;
const boardCol = 10;


const canvas = document.getElementById("canvas")
// 2ndコンテキストを取得
const SecondContext = canvas.getContext("2d")
//キャンバスサイズ
const canvasW = blockSize * boardCol;
const canvasH = blockSize * boardRow;
canvas.width = canvasW;
canvas.height = canvasH;

//コンテナ
const container = document.getElementById("container")
container.style.width = canvasW + 'px';

// テトリミノ1片の大きさ
const tetSize = 4;
//T字型のテトリミノ
let tet = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
]

//テトリミノのオフセット量（何マス分ずれているか）
let offsetX = 0;
let offsetY = 0;

const draw = () => {
    SecondContext.fillStyle = '#000';
    SecondContext.fillRect(0, 0, canvasW, canvasH);

    //塗りに赤を設定
    SecondContext.fillStyle = "#f00";
    //x座標150,y座標150の場所に幅30,縦30の四角を描画
    SecondContext.fillRect(150, 150, blockSize, blockSize);

    //テトリミノの描画
    for (let y = 0; y < tetSize; y++) {
        for (let x = 0; x < tetSize; x++) {
            if (tet[y][x]) {
                SecondContext.fillRect(
                    (offsetX + x) * blockSize,
                    (offsetY + y) * blockSize,
                    blockSize,
                    blockSize);
            }
        }
    }
}
document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 37: //左
            offsetX--;
            break;
        case 38: //上
            offsetY--;
            break;
        case 39: //右
            offsetX++;
            break;
        case 40: //下
            offsetY++;
            break;

    }
    draw();
}
//初期化処理
const init = () => {
    draw();

}