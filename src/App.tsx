import { useEffect, useState } from "react";
import "./App.css";
import CreateBingoCard from "./CreateBingoCard";
import CheckBingo from "./CheckBingo";
import CheckReach from "./CheckReach";

function BingoGame() {
  //多次元配列を作る(ここの型注意！)
  const [card, setCard] = useState<string[][]>([]);
  const [isDrawing, setIsDrawing] = useState<string>("start");
  //取り出された番号のリスト
  const [drawedNum, setDrawedNum] = useState<string[]>([]);

  //ボタンを押したらビンゴスタート
  const handleStart = () => {
    let randomNum = String(Math.floor(Math.random() * 75 + 1));
    //まだ出てない数字が出るまでランダムな値を取得し続ける
    while (drawedNum.includes(randomNum)) {
      randomNum = String(Math.floor(Math.random() * 75 + 1));
    }
    setDrawedNum((prevNumbers) => [...prevNumbers, randomNum]);
  };

  //全て引いたらリセットボタンを表示
  useEffect(() => {
    if (drawedNum.length === 75) {
      setIsDrawing("reset");
    }
  }, [drawedNum]);

  //リセットボタン
  const handleReset = () => {
    setDrawedNum([]);
    setIsDrawing("start");
  };

  return (
    <>
      <div className="flex flex-col gap-5 max-w-[960px] items-center">
        <div>
          <CreateBingoCard
            isDrawing={isDrawing}
            drawedNum={drawedNum}
            card={card}
            setCard={setCard}
          />
          <button
            onClick={isDrawing === "start" ? handleStart : handleReset}
            className="mt-6"
          >
            {isDrawing === "start" ? "start" : "reset"}
          </button>
        </div>
        <div className="max-w-[500px]">
          <p>すでに出た数字</p>
          <p className="min-h-12 mt-2">{drawedNum.join(" ")}</p>
        </div>
        <div>
          <CheckBingo drawedNum={drawedNum} card={card} />
          <CheckReach drawedNum={drawedNum} card={card} />
        </div>
      </div>
    </>
  );
}

export default BingoGame;
