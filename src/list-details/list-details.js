import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ListDetails = () => {
    const { state } = useLocation();
    const [details, setDetails] = useState({});
    useEffect(() => {
        const fetchRepoData = async () => {
            const repoDataFetch = await fetch(state.repo.url);
            const data = await repoDataFetch.json();
            setDetails(data);
        };
        fetchRepoData();
    })

    if (details) {
        return (
            <div>
                <h1>Repository Name: {details.name || 'None'}</h1>
                <h3>Organization Avatar: </h3><img src={`${details.owner?.avatar_url}` || 'None'} alt='repo avatar'></img>
                <h3>Watchers: {details.watchers || 'None'}</h3>
                <h3>Forks: {details.forks || 'None'}</h3>
                <h3>Open Issues: {details.open_issues || 'None'}</h3>
                <h3>License: {details.license?.name || 'None'}</h3>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Problem retrieving data.</h1>
            </div>
        )
    }
};

export default ListDetails;