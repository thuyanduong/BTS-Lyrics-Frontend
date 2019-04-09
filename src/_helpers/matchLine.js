import removeWhiteSpace from './removeWhiteSpace'

const match = (line, searchTerm) => {
  return removeWhiteSpace(line).toLowerCase().includes(removeWhiteSpace(searchTerm).toLowerCase())
}

export default match
