
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
}
//初期化処理
const init =()=>{
    draw();

}