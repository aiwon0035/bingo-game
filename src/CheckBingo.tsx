import { useEffect, useState } from "react";

type CheckBingoPropsType = {
  drawedNum: string[];
  card: string[][];
};

const CheckBingo = ({ drawedNum, card }: CheckBingoPropsType) => {
  const [bingoCount, setBingoCount] = useState(0); // ビンゴ数

  let count = 0;
  useEffect(() => {
    //このif文入れないと最初のcardの読み込めてない時にundefinedのエラー出る
    if (5 <= drawedNum.length) {
      // 行のチェック
      for (let row = 0; row < 5; row++) {
        //横一列全てがFREEordrawedNumに含まれている
        if (
          card[row] &&
          card[row].every((num) => num === "FREE" || drawedNum.includes(num))
        ) {
          count++;
          console.log("横ビンゴ");
        }
      }
      // 列のチェック
      for (let i = 0; i < 5; i++) {
        //各行のiばんめだけを取得して配列にする
        const cardCol = card.map((row) => row[i]);
        //   console.log(cardCol);
        if (cardCol.every((num) => num === "FREE" || drawedNum.includes(num))) {
          count++;
          console.log("縦ビンゴ");
        }
      }

      // 左上から右下の対角線のチェック
      if (
        card.every(
          (row, index) =>
            //rowはcardの5つの配列、indexはそれのインデックス
            row[index] === "FREE" || drawedNum.includes(row[index])
        )
      ) {
        count++;
        console.log("斜めビンゴ");
      }

      // 右上から左下の対角線のチェック
      if (
        card.every(
          (row, index) =>
            row[4 - index] === "FREE" || drawedNum.includes(row[4 - index])
        )
      ) {
        count++;
        console.log("斜めビンゴ");
      }
    }

    setBingoCount(count);
  }, [drawedNum]);

  return <div>ビンゴ数：{bingoCount}</div>;
};

export default CheckBingo;
