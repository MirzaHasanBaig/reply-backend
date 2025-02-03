const { Parser }  = require("json2csv")
const fs  = require("fs")

export const exportCSV = (data: any[], fields[], filePath) => {
  const json2csvParser = new Parser({ fields })
  const csv = json2csvParser.parse(data)

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, csv, (err) => {
      if (err) reject(err)
      else resolve(filePath)
    })
  })
}

