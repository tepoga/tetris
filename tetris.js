
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

//指定された方向に移動できるかの判定（x移動量, y移動量)
const canMove = (dx,dy) => {
    for (let y = 0; y <tetSize; y++) {
        for (let x = 0; x < tetSize ; x++){
            //その場所にブロッックがあれば
            if (tet[y][x]) {
                let nx = offsetX + x + dx;
                let ny = offsetY + y + dy;
                if(
                    //調整する座標がボード外だったらできない
                    ny < 0 ||
                    nx < 0 ||
                    ny >= boardRow ||
                    nx >= boardCol ||
                    //移動したいボード上の場所にすでに存在していたらできない。
                    board[ny][nx]
                ){
                    //移動できない。
                    return false;
                }
            }
        }
    }
    //移動できる
    return true;
};

document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 37: //左
            if (canMove(-1, 0)) offsetX--;
            break;
        case 38: //上
            if (canMove(0, -1)) offsetY--;
            break;
        case 39: //右
            if (canMove(1, 0)) offsetX++;
            break;
        case 40: //下
            if (canMove(0,1)) offsetY++;
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