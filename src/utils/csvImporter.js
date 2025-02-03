const csv  = require("csv-parser")
const fs  = require("fs")

export const constCSV = (filePath) => {
  const results = []

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error))
  })
}

