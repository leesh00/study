import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList'

const Home = () => {
    return (
        <div>
            <Header
                title={new Date().getMonth() + 1}
                leftChild={<Button text={"<"} />}
                rightChild={<Button text={">"} />}
            />
            <DiaryList />
        </div>
    )
}

export default Home;