const makeid = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyxz0123456789';
  for (let i = 0; i < length; i++) {
    result+= characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result;
}

export {makeid};