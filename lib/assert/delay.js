module.exports.delay = (time) => {
  return (result) => new Promise((resolve) => setTimeout(() => resolve(result), time))
}
