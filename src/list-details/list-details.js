import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ListDetails = () => {
    const { state } = useLocation();
    const details = useRef({})
    useEffect(() => {
        const fetchRepoData = async () => {
            const repoDataFetch = await fetch(state.repo.url);
            const data = await repoDataFetch.json();
            details.current = data;
        };
        fetchRepoData();
    })

    return (
        <div>
            <h1>Repository Name: {details.current.name}</h1>
            <h3>Organization Avatar: </h3><img src={`${details.current.owner.avatar_url}`} alt='repo avatar'></img>
            <h3>Watchers: {details.current.watchers}</h3>
            <h3>Forks: {details.current.forks}</h3>
            <h3>Open Issues: {details.current.open_issues}</h3>
            <h3>License: {details.current.license.name}</h3>
        </div>
    )
};

export default ListDetails;