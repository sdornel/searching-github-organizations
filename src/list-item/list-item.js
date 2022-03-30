import { Link } from "react-router-dom";

const ListItem = (props) => {
    if (props.repo?.id) {
        return (
            <li>
                <Link to={`/repo/${props.repo.id}`} state={{ repo: props.repo }} >{props.repo.name}</Link>
            </li>
        )
    }
};

export default ListItem;