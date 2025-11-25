import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hook/useDiary";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const curDiaryItem = useDiary(params.id);

    const onSubmit = (input) => {
        if (window.confirm("정말 수정하시겠습니까?")) {
            onUpdate(
                params.id,
                input.createDate.getTime(),
                input.emotionId,
                input.content
            );
            nav('/', { replace: true });
        }
    };


    const onClickDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            // 삭제로직
            onDelete(params.id);
            nav('/',{ replace : true });
        }
    }

    return (
        <div>
            <Header
                title={"수정하기"}
                leftChild={
                    <Button
                        text={"< 뒤로 가기"}
                        onClick={()=>nav(-1)}
                    />
                }
                rightChild={
                    <Button
                        text={"삭제하기"}
                        type={"NEGATIVE"}
                        onClick={onClickDelete}
                    />
                }
            />
            <Editor
                initData={curDiaryItem}
                onSubmit={onSubmit}
            />
        </div>

    )
}

export default Edit;