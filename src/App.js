import './App.css';
import { useEffect, useState } from 'react';
import ListItem from './list-item/list-item';

function App() {
  let [searchString, updateSearchString] = useState('');
  let [errorMessage, setErrorMessage] = useState(false);
  let [repoList, updateRepoList] = useState([]);

  const onInputStringChanged = (value) => {
    updateSearchString(value);
  }

  const fetchOrgs = async () => {
    const url = `https://api.github.com/orgs/${searchString}/repos`

    const fetchRequest = await fetch(url).catch(err => console.error(err) );
    if (fetchRequest.status === 404) {
      setErrorMessage(true);
      return;
    } else {
      setErrorMessage(false);
      let fetchRequestToJson;
      fetchRequestToJson = await fetchRequest.json();
      const list = [];
      if (fetchRequestToJson.length > 0) {
        fetchRequestToJson.forEach(repo => {
          list.push({ id: repo.id, url: repo.url, name: repo.name,  }); 
        })
        updateRepoList(list);
      }
    }
  }

  return (
    <div className="App">
      <h1>Github organization search</h1>
      <label>Input query here:</label><br/>
      <input type="text" onChange={(event) => onInputStringChanged(event.target.value)}></input>
      <button onClick={fetchOrgs}>Search</button>
      {
        errorMessage ? 
        <p>No data found. Please try again. (The github orgs API does not seem to support substring searches)</p>
        :
        null
      }
      {
        repoList.length > 0 ? 
        repoList.map((repo) => {
          return ( 
          <ul className="list">
            <ListItem repo={repo} key={repo.id} />
          </ul>
          )
        })
        :
        null
      }
    </div>
  );
}

export default App;
