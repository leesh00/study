import { useParams } from "react-router-dom";

const Diary = () =>{
    const params = useParams();
    return <div>{params.id}번쨰 날</div>
}

export default Diary;