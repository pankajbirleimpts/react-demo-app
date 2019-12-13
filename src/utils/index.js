/**
 * method firebaseResponseTransform
 * desc: change the firebase response as object of array
 * @param {*} response
 */
export function firebaseResponseTransform(response) {
  console.log("response", response, typeof response);
  const result = [];
  Object.keys(response).forEach(key => {
    result.push({ ...response[key], id: key });
  });
  return result;
}
