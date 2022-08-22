export async function loadTextFile(path) {
  const response = await fetch(path)
  return await response.text()
}