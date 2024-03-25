import { useEffect, useState } from "react";

type CheckBingoOrReachPropsType = {
  drawedNum: number[];
  card: (string | number)[][];
};

const CheckBingoOrReach = ({ drawedNum, card }: CheckBingoOrReachPropsType) => {
  const [bingoCount, setBingoCount] = useState(0); // ビンゴ数
  const [reachCount, setReachCount] = useState(0); // リーチ数

  //今のリーチ数とビンゴ数を数える（useEffectの更新で0に戻るため、クリックのたびに値が増え続けることを防ぐ）
  let bingo = 0;
  let reach = 0;

  //ビンゴ・リーチを調べる関数
  const CheckBingoOrReach = (array: (string | number)[]) => {
    //配列内の幾つがすでに引かれたかを調べる
    const bingoOrReachNum = array.filter(
      (num: string | number) =>
        num === "FREE" || drawedNum.includes(Number(num))
    ).length;

    switch (bingoOrReachNum) {
      case 4: //リーチの時
        reach++; //ここsetReachCount(c => c + 1)にするとクリックのたびに値が増え続けてしまう
        break;
      case 5: //ビンゴの時
        bingo++;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    //このif文入れないと最初のcardの読み込めてない時にundefinedのエラー出る
    if (5 <= drawedNum.length) {
      // 行のチェック
      for (let row = 0; row < 5; row++) {
        //cardに含まれる行の配列について調べる
        CheckBingoOrReach(card[row]);
      }
      // 列のチェック
      for (let i = 0; i < 5; i++) {
        //各行のiばんめだけを取得して配列にする
        const cardCol = card.map((row) => row[i]);
        CheckBingoOrReach(cardCol);
      }

      // 左上から右下の対角線のチェック
      //cardの5つの配列row、それのindexを取得して配列にする
      const cardTopLeft = card.map((row, index) => row[index]);
      CheckBingoOrReach(cardTopLeft);

      // 右上から左下の対角線のチェック
      const cardTopRight = card.map((row, index) => row[4 - index]);
      CheckBingoOrReach(cardTopRight);
    }

    setBingoCount(bingo);
    setReachCount(reach);
  }, [drawedNum]);

  return (
    <>
      <div>ビンゴ数：{bingoCount}</div>
      <div>リーチ数：{reachCount}</div>
    </>
  );
};

export default CheckBingoOrReach;
