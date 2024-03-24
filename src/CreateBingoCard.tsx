import { Dispatch, SetStateAction, useEffect } from "react";

type CreateBingoCardPropsType = {
  isDrawing: string;
  drawedNum: string[];
  card: string[][];
  setCard: Dispatch<SetStateAction<string[][]>>;
};

// カードを作る関数
const CreateBingoCard = ({
  isDrawing,
  drawedNum,
  card,
  setCard,
}: CreateBingoCardPropsType) => {
  //まず縦の配列を作る関数「1,3,5,7,9]
  const getRandomInt = (min: number, max: number) => {
    // 縦の配列内の数字が5つになるまでランダムな数字を取得する
    const columnNumbers: string[] = [];
    while (columnNumbers.length < 5) {
      const minNumber = Math.ceil(min);
      const maxNumber = Math.floor(max);

      const num = String(
        //FREEに合わせるためにstring型にした
        Math.floor(Math.random() * (maxNumber - minNumber) + minNumber)
      );
      //すでに選ばれていない数字ならcolumnNumbersに入れる
      if (!columnNumbers.includes(num)) {
        columnNumbers.push(num);
      }
    }

    return columnNumbers;
    // console.log(columnNumbers);
  };

  //isDrawingがstartに戻った時だけcardをリセットする
  useEffect(() => {
    if (isDrawing === "start") {
      const newCard = [];
      //縦の配列を5回繰り返し、それをcardの形にする
      for (let i = 0; i < 5; i++) {
        const array = getRandomInt(i * 15 + 1, i * 15 + 15 + 1);
        newCard.push(array);
      }

      //cardの縦横を入れ替える
      const transpose = (card: string[][]) => {
        if (card.length === 0) {
          return [];
        }
        //これ説明できるように
        return card[0].map((_, c) => card.map((r) => r[c]));
      };
      const transposedCard = transpose(newCard);

      //真ん中にFREEを入れる
      const updatedCard = [...transposedCard]; //コピーを作る
      updatedCard[2][2] = "FREE";
      setCard(updatedCard);
    }
    // console.log(card);
  }, [isDrawing]);

  //テキストの装飾
  const DrawedText = (cell: string) => {
    let bg;
    if (drawedNum.includes(cell) || cell === "FREE") {
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
          {/* index良くない */}
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
