export function fetchUntilSuccess(path, options) {
  return new Promise ((resolve, reject) => {
    let retryCount = 0
    const fetchTry = () => fetch(path, options).then(response => { 
      retryCount += 1
      if(response.status === 200) {
        resolve(response)
      } else {
        if(retryCount >= 10) {
          reject(response)
        } else {
          setTimeout(fetchTry, 1000)
        }
      }
    })
    fetchTry()
  })
}

export function jsonFetch(path) {
  return fetchUntilSuccess(path, { headers: { 'Accept': 'application/json' } }).then(resp => resp.json())
}