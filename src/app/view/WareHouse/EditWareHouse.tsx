import {useParams} from 'react-router-dom';

const EditWareHouse = () => {
    const params = useParams();
    console.log(params);
    return <div>Edit Location</div>;
};

export default EditWareHouse;
