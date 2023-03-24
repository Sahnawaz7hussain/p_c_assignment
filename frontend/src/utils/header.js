import { getLocalStorageData } from "./userLocalData";

let jwtTokan = getLocalStorageData("JWTTOKEN");

console.log("hssdfsfdsf", jwtTokan);
let userHeader = {
  authorization: `Berear ${jwtTokan}`,
};

export default userHeader;
