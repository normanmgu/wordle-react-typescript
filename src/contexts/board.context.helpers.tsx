import isRealWordAPI from "../utils/api/isWordAPI";

const isValidEntry = async (word: string): Promise<boolean> => {
 try{
  if(word.length < 5) 
    throw new Error("Word is not long enough");
  else if(!await isRealWordAPI(word)) {
    throw new Error(`${word} not valid word`);
  }
 } 
 catch(e) {
  console.log(e)
  return false;
 }

 return true;
}

export default isValidEntry;