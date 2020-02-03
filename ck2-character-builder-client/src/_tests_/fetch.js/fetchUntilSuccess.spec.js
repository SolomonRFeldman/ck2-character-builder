import { fetchUntilSuccess } from '../../fetch'
import fetchMock from 'fetch-mock'

const responseBody = {
  hi: "Bye",
  sup: "Cya"
}


it("can fetch", async() => {
  fetchMock.get('/success', responseBody)
  let fetchedData
  await fetchUntilSuccess('/success').then(resp => resp.json()).then(json => fetchedData = json)
  expect(fetchedData).toEqual(responseBody)
  fetchMock.restore('/success')
})

it("fetches 10 times before giving up and returning error", async() => {
  fetchMock.get('/failure', 500)
  let failureResponse
  await fetchUntilSuccess('/failure').catch(response => failureResponse = response)
  expect(fetchMock.calls('/failure').length).toEqual(10)
  expect(failureResponse.status).toEqual(500)  
  fetchMock.restore('/failure')
}, 20000)

it("fetches 3-5 times while request is bad for 4 seconds then returns success", async() => {
  fetchMock.get('/delayed', 500)
  let fetchedData
  const delayedFetch = fetchUntilSuccess('/delayed')
  setTimeout(() => fetchMock.get('/delayed', responseBody, {overwriteRoutes: true}), 4000)
  await delayedFetch.then(resp => resp.json()).then(json => fetchedData = json)
  

  expect(fetchMock.calls('/delayed').length).toBeGreaterThan(2)
  expect(fetchMock.calls('/delayed').length).toBeLessThan(6)
  expect(fetchedData).toEqual(responseBody)
  fetchMock.restore('/delayed')
}, 6000)

it("fetches only once when the fetch is slow but successful", async() => {
  fetchMock.get('/slow', async() => {
    await new Promise((resolve) => setTimeout(() => resolve(), 4000))
    return responseBody
  })
  let fetchedData
  const delayedFetch = fetchUntilSuccess('/slow')
  setTimeout(() => fetchMock.get('/slow', responseBody, {overwriteRoutes: true}), 4000)
  await delayedFetch.then(resp => resp.json()).then(json => fetchedData = json)
  
  expect(fetchMock.calls('/slow').length).toEqual(1)
  expect(fetchedData).toEqual(responseBody)
  fetchMock.restore('/slow')
}, 6000)