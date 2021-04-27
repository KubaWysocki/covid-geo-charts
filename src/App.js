import {useCallback, useEffect, useMemo, useState} from 'react'
import Search from './components/Search/Search'
import Chart from './components/Chart/Chart'
import Map from './components/Map/Map'

const App = () => {
  const [data, setData] = useState(null)
  const [region, setRegion] = useState(null)
  const [query, setQuery] = useState('')

  const apiCall = useCallback(async () => {
    let response = await fetch('https://covid-api.mmediagroup.fr/v1/cases')
    response = await response.json()
    setData(response)
  }, [])

  useEffect(apiCall, [apiCall])

  useEffect(() => {
    if(data && query in data) {
      setRegion(
        Object.entries(data[query]).reduce((prev, [key, value]) => {
          if (key === 'All' && value.lat && value.long) return prev.concat({...value, key: query})
          else if (value.lat && value.long) return prev.concat({...value, key})
          else return prev
        }, [])
      )
    }
    else setRegion(null)
  }, [data, query])

  const countries = useMemo(() => {
    if (data) {
      return Object.entries(data).reduce((prev, [key, value]) =>
        value.All.lat && value.All.long ? prev.concat({...value.All, key}) : prev
      , [])
    }
    else return []
  }, [data])

  return <>
    <Search query={query} onChange={setQuery}/>
    <Chart data={region || countries}/>
    <Map data={region || countries}/>
  </>
}

export default App