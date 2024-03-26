import { Dispatch, SetStateAction, useEffect } from "react";

type CreateBingoCardPropsType = {
  isDrawing: string;
  drawedNum: number[];
  card: (string | number)[][];
  setCard: Dispatch<SetStateAction<(string | number)[][]>>;
};

const CreateBingoCard = ({
  isDrawing,
  drawedNum,
  card,
  setCard,
}: CreateBingoCardPropsType) => {
  //縦の配列を作る関数「1,3,5,7,9]
  const createCol = (min: number, max: number) => {
    const columnNumbers: number[] = [];
    // 縦の配列内の数字が5つになるまでランダムな数字を取得する
    while (columnNumbers.length < 5) {
      const num = Math.floor(Math.random() * (max - min) + min);
      //すでに選ばれていない数字ならcolumnNumbersに入れる
      if (!columnNumbers.includes(num)) {
        columnNumbers.push(num);
      }
    }

    return columnNumbers;
  };

  //カードを作る関数
  const createRandomCard = () => {
    const newCard = [];
    //縦の配列を5回繰り返し、それをcardの形にする
    for (let i = 0; i < 5; i++) {
      const array = createCol(i * 15 + 1, i * 15 + 16);
      newCard.push(array);
    }

    //cardの縦横を入れ替える
    const transposedCard: (string | number)[][] = [];
    for (let i = 0; i < 5; i++) {
      const transposedRow = newCard.map((row) => row[i]);
      transposedCard.push(transposedRow);
    }

    //真ん中にFREEを入れる
    transposedCard[2][2] = "FREE";

    return transposedCard;
  };

  //isDrawingがstartになった時だけcardを作る
  useEffect(() => {
    if (isDrawing === "start") {
      //カードを作成
      let newCard = createRandomCard();
      //前のカードを取得する（なければ[]を取得）
      const previousCard = JSON.parse(
        localStorage.getItem("previousCard") || "[]"
      );

      //リロード前後のカードが同じかどうかをチェックする(===だけでは比較できないらしいのでstringifyを使う)
      while (JSON.stringify(previousCard) === JSON.stringify(newCard)) {
        //同じならカードを作り直す
        console.log("同じカードが生成されました。カードを作り直します。");
        newCard = createRandomCard();
      }
      // 同じでなければ現在のカードをローカルストレージに保存
      localStorage.setItem("previousCard", JSON.stringify(newCard));
      setCard(newCard);
    }
  }, [isDrawing]);

  //テキストの装飾
  const DrawedText = (cell: string | number) => {
    let bg;
    if (drawedNum.includes(Number(cell)) || cell === "FREE") {
      bg = "bg-slate-100";
    } else {
      bg = "";
    }

    return bg;
  };

  return (
    <>
      <table className="border-collapse border border-gray-300">
        <tbody>
          {card.map((row1, rowIndex) => (
            <tr key={rowIndex} className="border">
              {row1.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`w-16 h-16 border p-2 text-2xl ${DrawedText(
                    cell
                  )}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CreateBingoCard;
