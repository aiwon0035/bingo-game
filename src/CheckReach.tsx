import { useEffect, useState } from "react";

type CheckReachPropsType = {
  drawedNum: string[];
  card: string[][];
};

const CheckReach = ({ drawedNum, card }: CheckReachPropsType) => {
  const [reachCount, setReachCount] = useState(0); // ビンゴ数

  let count = 0;
  useEffect(() => {
    //このif文入れないと最初のcardの読み込めてない時にundefinedのエラー出る
    if (5 <= drawedNum.length) {
      // 行のチェック
      for (let row = 0; row < 5; row++) {
        if (
          //条件を満たす配列が4つの時
          card[row].filter((num) => num === "FREE" || drawedNum.includes(num))
            .length === 4
        ) {
          count++;
          console.log("横リーチ");
        }
      }
      // 列のチェック
      for (let i = 0; i < 5; i++) {
        //各行のiばんめだけを取得して配列にする
        const cardCol = card.map((row) => row[i]);
        if (
          //条件を満たす配列が4つの時
          cardCol.filter((num) => num === "FREE" || drawedNum.includes(num))
            .length === 4
        ) {
          count++;
          console.log("縦リーチ");
        }
      }

      // 左上から右下の対角線のチェック
      if (
        card.filter(
          (row, index) =>
            //rowはcardの5つの配列、indexはそれのインデックス
            row[index] === "FREE" || drawedNum.includes(row[index])
        ).length === 4
      ) {
        count++;
        console.log("左上斜めリーチ");
      }
    }

    // 右上から左下の対角線のチェック
    if (
      card.filter(
        (row, index) =>
          row[4 - index] === "FREE" || drawedNum.includes(row[4 - index])
      ).length === 4
    ) {
      count++;
      console.log("右上斜めリーチ");
    }

    setReachCount(count);
  }, [drawedNum]);

  return <div>リーチ数：{reachCount}</div>;
};

export default CheckReach;
