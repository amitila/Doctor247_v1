import { makeStyles, TextareaAutosize, TextField } from '@material-ui/core'
import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
    textSize: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '100%',
        margin: "auto",
        border: "#303F9F solid 5px",
        borderRadius: 5,
        padding: '10px',
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'orange',
    },
    title: {
        textAlign: "center",
    },
    dropzone: {
        heigh: "5px",
    },
    stretch: {
        marginTop: "10px",
    }
}));

export default function QuestionForm(){
    const classes = useStyles();
    const [question] = React.useState([
        "Xương khớp",
        "Đau lưng, nhứt mỏi 3 ngày và đã uống thuốc giảm đau",
        "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/64922148_358667398350685_4240578411438800896_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=2xtJ36vD13YAX-TAOsJ&tn=qBeE9dEV8LO_X8tf&_nc_ht=scontent.fdad3-3.fna&oh=80df96e535fe5622a2e081a2f95a3850&oe=615F10C1"
    ]);

    return (
        <div className={classes.paper} >
            <form className={classes.form} noValidate>
                <Typography variant="h6" className={classes.title} >
                    Đặt câu hỏi cho bác sĩ (miễn phí)
                </Typography>
                <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="subject"
                    value={question[0]}
                    label="Tiêu đề"
                    name="subject"
                />
                <Typography paragraph className={classes.stretch} >
                    Trình bày thông tin bao gồm:<br />
                    1. Giới tính <br />
                    2. Tuổi tác <br />
                    3. Triệu chứng xuất hiện <br />
                    4. Đã xử lý ra sao <br />
                    5. Hình ảnh kèm theo (tối đa 3 ảnh nếu có)
                </Typography>
                <TextareaAutosize
                    className={classes.textSize}
                    value={question[1]}
                    minRows={5}
                    placeholder="Vui lòng trình bày đủ thông tin như hướng dẫn trên để bác sĩ có đủ thông tin và việc hồi đáp sẽ chính xác hơn"
                >
                    
                </TextareaAutosize>
                <DropzoneArea
                    className={classes.dropzone}
                    filesLimit={3}
                    acceptedFiles={['image/*']}
                    dropzoneText={"Kéo ảnh thả vào hay nhấp vào để tải ảnh lên"}
                    onChange={(files) => console.log('Files:', files)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Gửi câu hỏi
                </Button>
            </form>

        </div>
    )
}