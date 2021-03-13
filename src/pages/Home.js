import React, {useState} from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [result, setResult ] = useState(null);

  const onSearch = () =>{
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResult(result)
      console.log(result)
    })
}

  const onInputChange = (ev) => {
    setInput(ev.target.value)
  }
  const onKeyDown = (ev) => {
    if(ev.keyCode === 13){
      onSearch()
    }
  }

  const renderResults= () => {
    if(result && result.length === 0){
      return <div>No results</div>
    }

    if(result && result.length > 0){
      return (
      <div>
        {result.map(item => (
          <div key={item.show.id}>{item.show.name}</div>
        ))}
      </div>
      )
    }

    return null;
  }

  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
      <button type="button" onClick={onSearch}>Search</button>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home