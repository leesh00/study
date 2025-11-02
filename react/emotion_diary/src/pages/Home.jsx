// searchParams tset
import { useSearchParams } from "react-router-dom";

const Home = () =>{
    const [params, setParams] = useSearchParams();
    return <div>{params.get("value")} Home</div>
}

export default Home;