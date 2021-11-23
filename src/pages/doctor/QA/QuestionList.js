import React, { useContext, useEffect, useState } from 'react';
import '../Profile/Profile.css';
import { Grid } from '@material-ui/core';
import { AppContext } from '../../../store/AppProvider';

import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';

import APIService from '../../../utils/APIService';
import getToken from '../../../helpers/getToken';

// const token = localStorage.getItem("token_doctor247");
const token = getToken();

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    smallAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    largeAvatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
    editIcon: {
        fontSize: '25px',
        marginLeft: '10px',
        cursor: 'pointer',
        '&:hover': {
            color: '#004d40'
         },
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: '20ch',
    },
}));

function getStatus(status){
    if(status === "DONE"){
        return "Đã khám";
    }
    else if(status === "PENDING"){
        return "Chưa khám";
    }
    else if(status === "DOING"){
        return "Đang khám";
    }
}

function Row(props) {
    const { data } = props;

    const classes = useStyles();

    const row = createQA(data);

    const [openAnswer, setOpenAnswer] = React.useState(false);
    const [answers, setAnswers] = React.useState([]);
    const [myAnswer, setMyAnswer] = React.useState('');

    useEffect(() => {
        if(openAnswer){
            APIService.getAnswer(row.id, {}, (success, json) => {
                if (success && json.result) {
                    console.log('getAnswer');
                    console.log(json.result);
                    setAnswers(json.result);
                }
            });
        }
    }, [openAnswer]);

    const handleSendAnswer = () => {
        if(myAnswer.length < 50){
            alert('Câu trả lời phải có độ dài ít nhất 50 kí tự.');
            return;
        }
        APIService.postDoctorAnswer(
            token,
            row.id,
            myAnswer,
            null,
            (success, json) => {
                if (success && json.result) {
                    console.log('answered');
                    console.log(json.result);
                }
            }
        );
        setMyAnswer('');
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    {(answers===null)?null:<IconButton aria-label="expand row" size="small" onClick={() => setOpenAnswer(!openAnswer)}>
                        {openAnswer ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>}
                </TableCell>
                <TableCell >{row.createdAt}</TableCell>
                <TableCell >{row.customer}</TableCell>
                <TableCell >{row.content}</TableCell>
                <TableCell>
                </TableCell>
            </TableRow>
            {(answers===null)?null:
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openAnswer} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Hình ảnh
                                {
                                    row.images.length === 0 ? ': Không có' : (row.images.length + ' hình')
                                }
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="30%"></TableCell>
                                        <TableCell width="30%"></TableCell>
                                        <TableCell width="30%"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        <TableRow key={1}>
                                            {row.images.map((image) => (
                                                <TableCell>
                                                    <img src={image.imgSrc} style={{ margin: '3%' }} width="95%" height="200" alt="" />
                                                </TableCell>

                                            ))}
                                        </TableRow>
                                </TableBody>
                            </Table>

                            <Typography variant="h6" gutterBottom component="div">
                                Trả lời
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="90%"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {answers.map((answer) => (
                                        <TableRow key={answer.id}>
                                            <TableCell>
                                                <TextField
                                                    id="standard-multiline-flexible"
                                                    label={"Trả lời bởi " + answer.doctorId + " lúc " + answer.createdAt.substring(0, 17).replace('T',' ')}
                                                    multiline
                                                    fullWidth
                                                    defaultValue={answer.content}
                                                    InputProps={{
                                                      readOnly: true,
                                                      'aria-label': 'naked' 
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                        <TableRow>
                                            <TableCell>
                                                <TextField
                                                    id="standard-multiline-flexible2"
                                                    label="Trả lời"
                                                    multiline
                                                    fullWidth
                                                    onChange={(e) => {setMyAnswer(e.target.value)}}
                                                    value={myAnswer}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    endIcon={<SendIcon />}
                                                    onClick={handleSendAnswer}
                                                >
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>}
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        customer: PropTypes.number.isRequired,
        images: PropTypes.array.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};

function createQA(question){
    return {
        id: question.id,
        content: question.content,
        customer: question.customer.firstName + " "+ question.customer.lastName,
        images: question.images,
        createdAt: question.createdAt
    };
}

function QuestionsList(props) {
    const classes = useStyles();

    const { questionsList, specializations } = props;

    const [selectedSpecialization, setSelectedSpecialization] = React.useState(0);
    const [openSpecialization, setOpenSpecialization] = React.useState(false);
    const [questionsFilterList, setQuestionsFilterList] = React.useState([]);

    const handleChangeSpecialization = (event) => {
        setSelectedSpecialization(event.target.value);
    };

    const handleCloseSpecialization = () => {
        setOpenSpecialization(false);
    };

    const handleOpenSpecialization = () => {
        setOpenSpecialization(true);
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Grid container xs={12} sm={12} spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <h3>Điều kiện tìm kiếm</h3>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Chuyên khoa</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openSpecialization}
                                onClose={handleCloseSpecialization}
                                onOpen={handleOpenSpecialization}
                                value={selectedSpecialization}
                                onChange={handleChangeSpecialization}
                            >
                                <MenuItem value={0}>Tất cả</MenuItem>
                                {
                                    specializations.map(specialization => 
                                        (<MenuItem value={specialization.id}>{specialization.name}</MenuItem>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <h3>Danh sách câu hỏi</h3>
                    </Grid>
                </Grid>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell width="10%"/>
                            <TableCell width="15%">Thời gian</TableCell>
                            <TableCell width="15%">Người hỏi</TableCell>
                            <TableCell width="50%">Nội dung câu hỏi</TableCell>
                            <TableCell width="10%"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questionsList.map((data) => (
                            <Row key={data.aid} data={data} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default function QuestionList(props) {
    const [questionsList, setQuestionsList] = useState([]);
    const [specializations, setSpecializationsList] = useState([]);

    useEffect(() => {
        APIService.getPublicQuestion({}, (success, json) => {
            if (success && json.result) {
                console.log('getQuestion');
                console.log(json.result);
                setQuestionsList(json.result);
            }
        });
        
        APIService.getSpecialized((success, json) => {
            if (success && json.result) {
                console.log('getSpecialized');
                console.log(json.result);
                setSpecializationsList(json.result);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <div>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <QuestionsList questionsList={questionsList} specializations={specializations}/>
                    </Grid>
                    <Grid xs={12} md={12} style={{marginTop: "100px"}}>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}