import isRealWordAPI from "./isWordAPI";

const generateRandomWordAPI = async (): Promise<string> => {
  let word = "NOT_A_REAL_WORD";
  while(!await isRealWordAPI(word)) {
    const wordResponse= await fetch("https://random-word-api.herokuapp.com/word?length=5", {
      method: "GET",
    })
    let wordArr = await wordResponse.json();
    word = wordArr[0];
  }
  console.log(word)

  return word;
}

export default generateRandomWordAPI;