
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

const draw = () => {
    SecondContext.fillStyle = '#000';
    SecondContext.fillRect(0, 0, canvasW, canvasH);

    //塗りに赤を設定
    SecondContext.fillStyle = "#f00";
    //x座標150,y座標150の場所に幅30,縦30の四角を描画
    SecondContext.fillRect(150, 150, blockSize, blockSize);
}
//初期化処理
const init = () => {
    draw();

}