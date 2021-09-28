module.exports.checkError = (err, req, res) => {
  if (err.name === "ValidationError") {
    res.status(400).send({ message: err.message })
    return;
  }
  res.status(500).send({ message: err.message, name: err.name });
}

module.exports.checkQueryOfNull = (data, req, res) => {
  if (data.length === 0) {
    res.status(404).send({ message: "Not found" })
    return;
  }
  res.send({data: data});
}