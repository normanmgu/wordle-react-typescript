import axios from "axios";

const isRealWordAPI = async (queryWord: string): Promise<boolean> => {
  console.log(queryWord);
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${queryWord}`, { method: "GET" })

 return response.status === 200 ? true : false;
}

export default isRealWordAPI;