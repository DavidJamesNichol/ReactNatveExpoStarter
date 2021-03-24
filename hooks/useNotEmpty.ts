//useNotEmpty goes through an object to check if any value is empty
//If empty value is found, return key with Object.keys(X)[iteration]
export default function useNotEmpty(payload) {
  let keys = Object.keys(payload)
  let emptyArray = []
  keys.map((key, keyI) => {
    if (!!payload[key]) {}
    else {
      emptyArray = emptyArray.concat(keys[keyI]) || [keys[keyI]]
      console.log(emptyArray)
    }
  })
    return emptyArray;
}
