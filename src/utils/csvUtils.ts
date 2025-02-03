const csv  = require("csv-parser")
const { createObjectCsvWriter }  = require("csv-writer")
const fs  = require("fs")

export const constCSV = (filePath): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error))
  })
}

export const exportCSV = async (data: any[], fields[], filePath) => {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: fields.map((field) => ({ id: field, title: field })),
  })

  await csvWriter.writeRecords(data)
}

