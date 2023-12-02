//落下サイクル
const speed = 300;
//ブロック1マスの大きさ
const blockSize = 30;
//ボードサイズ
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
//テトリミノの種類
const tetTypes = [
    [], //最初の要素を空としておく
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
    ],
];

//テトリミノの色
const tetColors = [
    '',//これが選択されることはない
    '#f6fe85',
    '#07e0e7',
    '#7ced77',
    '#f78ff0',
    '#f94246',
    '#9693fe',
    '#f2b907',
];

//テトリミノのindex
let tet_idx;
//選択されたtet
let tet;

//テトリミノのオフセット量（何マス分ずれているか）
let offsetX = 0;
let offsetY = 0;

//ボード本体
const board = [];

//タイマーID
let timeId = NaN;

//ゲームオーバーフラグ
let isGameOber = false;

const draw = () => {
    SecondConText.fillStyle = '#000';
    SecondConText.fillRect(0, 0, canvasW, canvasH);

    //ボードに存在しているブロックを塗る
    for (let y = 0; y < boardRow; y++) {
        for (let x = 0; x < boardCol; x++) {
            if (board[y][x]) {
                drawBlock(x, y, board[y][x]);
            }
        }
    }

    //テトリミノの描画
    for (let y = 0; y < tetSize; y++) {
        for (let x = 0; x < tetSize; x++) {
            if (tet[y][x]) {
                drawBlock(offsetX + x, offsetY + y, tet_idx);
            }
        }
    }
};

//ブロックを一つ描画する
const drawBlock = (x, y, tet_idx) => {
    let px = x * blockSize;
    let py = y * blockSize;

    //塗り色
    SecondConText.fillStyle = tetColors[tet_idx];
    SecondConText.fillRect(px, py, blockSize, blockSize);
    //線を設定
    SecondConText.strokestyle = 'black';
    //線を描写
    SecondConText.strokeRect(px, py, blockSize, blockSize);
};

//指定された方向に移動できるかの判定（x移動量, y移動量)
const canMove = (dx, dy, nowTet = tet) => {
    for (let y = 0; y < tetSize; y++) {
        for (let x = 0; x < tetSize; x++) {
            //その場所にブロッックがあれば
            if (nowTet[y][x]) {
                //ボード座標に変換
                let nx = offsetX + x + dx;
                let ny = offsetY + y + dy;
                if (
                    //調整する座標がボード外だったらできない
                    ny < 0 ||
                    nx < 0 ||
                    ny >= boardRow ||
                    nx >= boardCol ||
                    //移動したいボード上の場所にすでに存在していたらできない。
                    board[ny][nx]
                ) {
                    //移動できない。
                    return false;
                }
            }
        }
    }
    //移動できる
    return true;
};

//回転
const createRotateTet = () => {
    //新しいtetを作る
    let newTet = [];
    for (let y = 0; y < tetSize; y++) {
        newTet[y] = [];
        for (let x = 0; x < tetSize; x++) {
            //時計回りに90度回転させる
            newTet[y][x] = tet[tetSize - 1 - x][y];
        }
    }
    return newTet;
}

document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 37: //左
            if (canMove(-1, 0)) offsetX--;
            break;
        case 39: //右
            if (canMove(1, 0)) offsetX++;
            break;
        case 40: //下
            if (canMove(0, 1)) offsetY++;
            break;
        case 32: //Space
            let newTet = createRotateTet();
            if (canMove(0, 0, newTet)) {
                tet = newTet;
            }
    }
    draw();
};

//動きが止まったtetをボード座標に書き写す
const fixTet = () => {
    for (let y = 0; y < tetSize; y++) {
        for (let x = 0; x < tetSize; x++) {
            if (tet[y][x]) {
                //ボードに書き込む
                board[offsetY + y][offsetX + x] = tet_idx;
            }
        }
    }
}
const clearLine = () => {
    //ボードの行を上から調査
    for (let y = 0; y < boardRow; y++) {
        //一列揃っていると仮定する（フラグ）
        let isLineOK = true;
        //列に0が入ってないか調査
        for (let x = 0; x < boardCol; x++) {
            if (board[y][x] === 0) {
                //0が入ってたのでフラグをfalese
                isLineOK = false;
                break;
            }
        }
        if (isLineOK) {
            //ここに来るということはその列が揃っていたことを意味する
            //その行から上に向かってfor文を動かす
            for (let ny = y; ny > 0; ny--) {
                for (let nx = 0; nx < boardCol; nx++) {
                    //一列上の情報をコピーする
                    board[ny][nx] = board[ny - 1][nx];
                }
            }
        }
    }
}

//繰り返し行われる落下処理
const droptet = () => {
    //下に行けたら
    if (canMove(0, 1)) {
        offsetY++;
    } else {
        //行けなかったら固定する
        fixTet();
        //揃ったラインがあったら消す
        clearLine();
        //抽選
        tet_idx = randomIdx();
        tet = tetTypes[tet_idx];
        //初期位置に戻す
        initStarPos();
    }
    draw();
};

const initStarPos = () => {
    offsetX = boardCol / 2 - tetSize / 2;
    offsetY = 0;
};

//テトリミノのindexを抽選
const randomIdx = () => {
    return Math.floor(Math.random() * (tetTypes.length - 1)) + 1;
}
//初期化処理
const init = () => {
    //ボード(20*10を0で埋める)
    for (let y = 0; y < boardRow; y++) {
        board[y] = [];
        for (let x = 0; x < boardCol; x++) {
            board[y][x] = 0;
        }
    }

    //テスト用
    //board[3][5]=1;

    //最初のテトリミノを抽選
    tet_idx = randomIdx();
    tet = tetTypes[tet_idx];

    initStarPos();
    //繰り返し処理
    timeId = setInterval(droptet, speed);
    draw();

}
