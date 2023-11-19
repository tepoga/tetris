
//ボードのサイズ
const blockSize = 30;
const boardRow = 20;
const boardCol = 10;

//キャンバスの取得
const canvas = document.getElementById('canvas')
// 2ndコンテキストを取得
const SecondConText = canvas.getContext('2d')

//キャンバスサイズ
const canvasW = blockSize * boardCol;
const canvasH = blockSize * boardRow;
canvas.width = canvasW;
canvas.height = canvasH;

//コンテナの設定
const container = document.getElementById('container')
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

//ボード本体
const board = [];

const draw = () => {
    SecondConText.fillStyle = '#000';
    SecondConText.fillRect(0, 0, canvasW, canvasH);

    //ボードに存在しているブロックを塗る
    for (let y = 0; y < boardRow; y++){
        for(let x = 0; x < boardCol; x++){
            if(board[y][x]){
                drawBlock(x, y);
            }
        }
    }

    //テトリミノの描画
    for (let y = 0; y < tetSize; y++) {
        for (let x = 0; x < tetSize; x++) {
            if (tet[y][x]) {
                drawBlock(offsetX + x, offsetY + y)
            }
        }
    }
};

 //ブロックを一つ描画する
 const drawBlock = (x, y) => {
    let px = x * blockSize;
    let py = y * blockSize;

    //塗り色
    SecondConText.fillStyle = '#f00';
    SecondConText.fillRect (px, py, blockSize, blockSize);
    //線を設定
    SecondConText.strokestyle = 'black';
    //線を描写
    SecondConText.strokeRect(px, py, blockSize, blockSize);
 };

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
};
//
//初期化処理
const init = () => {
    //ボード(20*10を0で埋める)
    for (let y = 0; y < boardRow; y++){
        board[y] =[];
        for(let x = 0; x < boardCol; x++) {
            board[y][x] = 0;
        }
    }

    //テスト用
    board[3][5]=1;

    draw();

}