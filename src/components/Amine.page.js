import { useState } from "react";
// import { useQuery } from "react-query";
// import axios from "axios";

// const fetchTree = () => {
//   return axios.get("http://localhost:4000/tree");
// };
export const AminePage = () => {
  const [sum, setSum] = useState();

  // const { data } = useQuery("amine-data", fetchTree);
  const tree = [10, 20, 30, 40, 50, 60, 70];
  const sumTreeFunction = (tree) => {
    const sumTree = [...tree];
    let lastFile = null;
    if (lastFile) {
      sumTree.push(lastFile);
    }
    if (sumTree.length % 2 === 0 && sumTree.length > 0) {
      for (let i = 0; i < sumTree.length - 1; i++) {
        const size = sumTree[i];
        if (!!size) {
          const sum = sumTree[i] + sumTree[i + 1];
          sumTree.shift();
          sumTree.shift();
          sumTree.unshift(sum);
        }
      }
      sumTreeFunction(sumTree);
    } else if (sumTree.length % 2 !== 0 && sumTree.length > 0) {
      lastFile = sumTree[sumTree.length - 1];
      sumTree.pop();
      sumTreeFunction(sumTree);
    }
    setSum(sumTree);
  };
  return (
    <div className="box">
      <h2>Amine Tree</h2>
      <button onClick={() => sumTreeFunction(tree)}>Fetch Sum</button>
      <div className="box_content">
        <pre>{JSON.stringify(sum, 2, null)}</pre>
      </div>
    </div>
  );
};
