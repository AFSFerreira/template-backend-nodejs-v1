// export function buildSearchQuery(
//   searchContent: string,
//   tableName: string,
//   fieldName: string,
// ) {
//   const splittedSearchContent = searchContent.split(' ')

//   let searchQuery = `
//         SELECT * FROM ${tableName}
//         WHERE
//     `

//   splittedSearchContent.forEach((word, idx, arr) => {
//     if (idx < arr.length - 1) {
//       searchQuery += `${fieldName} % '${word}' AND `
//     } else {
//       ///
//     }
//   })
// }
