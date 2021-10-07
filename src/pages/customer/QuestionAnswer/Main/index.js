import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import QuestionControl from './QuestionControl';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';

const questionList = [];
const token = document.cookie.slice(6);
var flag = [];
APIService.getQuestionMy(
    token,
    (success, json) => {
        if (success && json.result) {
            json.result.map(item => {
                return questionList.push(item);
            })
            questionList?.map(item => {
                return flag.push({
                    id: item.id,
                    updatedAt: item.updatedAt,
                    title: item.title ? item.title : "Bệnh",
                    content: item.content,
                    images: item.images,
                    answers: item.answers,
                    questionLike: item._count.questionLike
                })
            })
            return console.log("Lấy câu hỏi thành công");
        } else {
            return console.log("Lỗi server !");
        }
    }
)

export default function Index() {
    const history = useHistory();
    // const flag = (localStorage && localStorage.getItem('questions')) ? JSON.parse(localStorage.getItem('questions')) : [];
    const [questions, setQuestions] = useState(flag);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);
    //const [filter, setFilter] = useState({name: '', status: -1});
    //const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState({ by: 'name', value: 1 });

    const onToggleForm = (event) => {//Add task
        if (isDisplayForm && taskEditing !== null) {
            setIsDisplayForm(true);
            setTaskEditing(null);
        } else {
            setIsDisplayForm(!isDisplayForm);
            setTaskEditing(null);
        }
    }

    const onCloseForm = (event) => {
        setIsDisplayForm(false);
        history.push("/question");
    }

    const onShowForm = (event) => {
        setIsDisplayForm(true);
    }

    const onSubmit = (data) => {
        if (data.id === '') {
            APIService.postQuestion(
                token,
                {
                    content: data.content,
                    images: data.images
                },
                (success, json) => {
                    if (success && json.result) {
                        return alert("THÀNH CÔNG !");
                    } else {
                        return alert("Cập nhật thay đổi THẤT BẠI !");
                    }
                })
        } else {
            //Editing
            // const index = findIndex(data.id);
            // questions[index] = data;
            const deleteImgs =[];
            data.imagesView?.map(item => {
                deleteImgs.push(item.slice(-36, -4));
                return 0;
            })
            console.log(data);
            console.log(deleteImgs);
            APIService.putQuestionById(
                token,
                data.id,
                {
                    content: data.content,
                    images: data.images,
                    deleteImgs: deleteImgs
                },
                (success, json) => {
                    if (success && json.result) {
                        console.log('json.result');
                        console.log(json.result);
                        return alert("Cập nhật THÀNH CÔNG !");
                    } else {
                        return alert("Cập nhật thay đổi THẤT BẠI !");
                    }
                }
            )
        }
        setQuestions(questions);
        setTaskEditing(null);
        // localStorage.setItem('questions', JSON.stringify(questions));
    }

    const onUpdateStatus = (id) => {
        const index = findIndex(id);
        if (index !== -1) {
            questions[index].status = !questions[index].status;
            setQuestions(questions);
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    }

    const findIndex = (id) => {
        let result = -1;
        questions.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    const onDelete = (id) => {
        const index = findIndex(id);
        if (index !== -1) {
            questions.splice(index, 1);
            console.log(questions);
            localStorage.setItem('questions', JSON.stringify(questions));
        }
        onCloseForm();
    }

    const onUpdate = (id) => {
        const index = findIndex(id);
        const taskEditing = questions[index];
        setTaskEditing(taskEditing);
        console.log(taskEditing);
        onShowForm();
    }

    const onFilter = (filterTitle, filterContent) => {
        // setFilter({
        //     name : filterName,
        //     status : filterStatus
        // });

        let temp = flag.filter((task) => {
            return task.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.content.toLowerCase().indexOf(filterContent.toLowerCase()) !== -1;
        });

        // temp = temp.filter((task) => {
        //     if(filterStatus === '-1' || filterStatus === -1){
        //         return task;
        //     }else{
        //         return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
        //     }
        // });
        setQuestions(temp);
    }

    const onSearch = (keyword) => {
        //setKeyword(keyword);
        console.log(flag);
        let temp = flag.filter((task) => {
            return task.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || task.content.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setQuestions(temp);
    }

    const onSort = (sortBy, sortValue) => {
        setSort({
            by: sortBy,
            value: sortValue
        });

        if (sortBy === 'title') {
            const typeName = flag.sort((a, b) => {
                if (a.title < b.title) return sortValue;
                else if (a.title > b.title) return - sortValue;
                else return 0;
            });
            setQuestions(typeName);
        } else {
            // const typeStatus = flag.sort((a, b) => {
            //     if(a.status > b.status) return -sortValue;
            //     else if(a.status < b.status) return sortValue;
            //     else return 0;
            // });
            // setQuestions(typeStatus);
        }
    }

    var elmTaskForm = isDisplayForm
        ? <QuestionForm
            onSubmit={onSubmit}
            onCloseForm={onCloseForm}
            task={taskEditing}
        /> : '';

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Bệnh nhân hỏi - Bác sĩ trả lời</h1>
                <br />
            </div>
            <div className="row">
                <div  >
                    {isDisplayForm ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                {elmTaskForm}
                            </Grid>
                            <Grid item xs={12} sm={8}>

                                {/* Search-Sort */}
                                <QuestionControl
                                    onSearch={onSearch}
                                    onSort={onSort}
                                    sortBy={sort.by}
                                    sortValue={sort.value}
                                />

                                 {/* List*/}
                                <QuestionList
                                    questions={questions}
                                    onUpdateStatus={onUpdateStatus}
                                    onDelete={onDelete}
                                    onUpdate={onUpdate}
                                    onFilter={onFilter}
                                />

                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2}>
                            {elmTaskForm}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3} >
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={onToggleForm}
                                    >
                                        <AddIcon />
                                        Thêm vấn đề bạn muốn hỏi
                                    </button>
                                </Grid>
                                <Grid item xs={12} sm={9} >
                                    {/* Search-Sort */}
                                    <QuestionControl
                                        onSearch={onSearch}
                                        onSort={onSort}
                                        sortBy={sort.by}
                                        sortValue={sort.value}
                                    />
                                </Grid>
                            </Grid>
                            {/* List*/}
                            <QuestionList
                                questions={questions}
                                onUpdateStatus={onUpdateStatus}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                                onFilter={onFilter}
                            />
                        </Grid>
                    }
                </div>
            </div>
        </div>
    );
}