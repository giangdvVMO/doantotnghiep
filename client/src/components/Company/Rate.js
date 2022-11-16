import { Button, Form, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { checkContent, checkTitle } from '../../common/validation';
import { serverURL } from '../../configs/server.config';
import '../../styles/form.css';
import { openNotificationWithIcon } from '../../common/service';
import { messageEmail } from '../../common/error';
import TextArea from 'antd/lib/input/TextArea';

export const Rate = ({id_student, id_company, setOpenRate}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const ref = useRef();
    const refButtonSubmit = useRef();

    const [validateTitle, setValidateTitle] = useState({
        status: 'success',
        errorMsg: null
    });
    const [validateContent, setValidateContent] = useState({
        status: 'success',
        errorMsg: null
    });

    function checkTitleFunc(Title) {
        if (!checkTitle(Title)) {
            setValidateTitle({
                status: 'error',
                errorMsg: messageEmail.title
            })
            return false;
        } else {
            setValidateTitle({
                status: 'success',
                errorMsg: null
            })
            return true;
        }
    }

    function checkContentFunc(Content) {
        if (!checkContent(Content)) {
            setValidateContent({
                status: 'error',
                errorMsg: messageEmail.content
            })
            return false;
        } else {
            setValidateContent({
                status: 'success',
                errorMsg: null
            })
            return true;
        }
    }

    function handleChangeTitle(e) {
        setTitle( e.target.value);
    }

    function handleChangeContent(e) {
        setContent(e.target.value);
    }

    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            console.log('enter');
            refButtonSubmit.current.focus();
            refButtonSubmit.current.click();
        }
    }
    async function handleSubmit(e) {
        // ref.current.submit();
        let count = 0;
        count = checkTitleFunc(title) ? count : count + 1;
        count = checkContentFunc(content) ? count : count + 1;
        console.log(count);
        if (count === 0) {
            const url = serverURL + 'letter';
            const data = {
                title, content, id_account:id_company,students:[id_student]
            };
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                );
                const result = await response.json();
                if(response.status!==201){
                    // if(response.status===400){
                    //     openNotificationWithIcon('error', 'Thông báo', result.message)
                    // }
                    message.error("Không thành công!");
                }else{
                    openNotificationWithIcon('success', 'Thông báo', 'Bạn đã gửi thư tới sinh viên')
                }
                
                setOpenRate(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        return;
    }

    const [form] = Form.useForm();
    // function handleReset(){
    //     setUser((preUser)=>{return {...preUser, username: '', password: ''}})
    //     form.resetFields();
    //     setValidateUsername({
    //         status: 'success',
    //         errorMsg: null
    //     });
    //     setValidatePassword({
    //         status: 'success',
    //         errorMsg: null
    //     })
    // }
    return (
            <div>
                <Form
                    form={form}
                    ref={ref}
                    onKeyUp={handleKeyUp}
                    className='form'
                    name="basic"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    autoComplete="off"

                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        validateStatus={validateTitle.status}
                        help={validateTitle.errorMsg}
                        rules={[{ required: true, message: 'Hãy nhập tên tiêu đề!' }]}
                    >
                        <Input
                            autoFocus={true}
                            value={title}
                            onChange={handleChangeTitle}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        validateStatus={validateContent.status}
                        help={validateContent.errorMsg}
                        rules={[{ required: true, message: 'Hãy nhập nội dung thư!' }]}
                    >
                        <TextArea rows={5} value={content} 
                                defaultValue={content} 
                                onChange= {handleChangeContent}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type='submit' ref={refButtonSubmit} name='button-submit' className='button submit' onSubmit={handleSubmit} onClick={handleSubmit} onKeyUp={handleKeyUp}>Submit</Button>
                        {/* <Button type='reset' onClick={handleReset} className='button reset'>Reset</Button> */}
                    </Form.Item>
                </Form>
            </div>
    );
}
