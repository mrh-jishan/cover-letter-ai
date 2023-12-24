import { useEffect } from 'react';
import React, { useState } from 'react';
import { ImportOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip, Input, Row, Form, Col, Space } from 'antd';

const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                },
            );
    }, [values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable}>
            Submit
        </Button>
    );
};

export default function App() {

    const [form] = Form.useForm();
    const [modaOpen, setModaOpen] = useState(false);

    function gptPrompt(jobDescription, jobRequirements) {
        return `You are a skilled and enthusiastic [Your Profession] applying for the [Job Title] position at [Company Name]. Your goal is to create a compelling cover letter that highlights your qualifications and expresses your interest in the role. The job description and company details are provided in the HTML text below:
            ---    
            **Job Description:**
            ${jobDescription}
            **Job Requirements:**
            ${jobRequirements}    
            ---
            Now, please craft a persuasive cover letter addressing the key points mentioned in the job description and showcasing how your skills and experiences align with the company's values and requirements. Feel free to personalize the letter as needed.`
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message === 'ON_URL_CHANGE') {
            // const jobTitle = document.querySelector(".job-details-jobs-unified-top-card__content--two-pane")
            // const jobDescription = document.querySelector(".jobs-description__container #job-details > span")
            // setJobTitle(jobTitle)
            // setJobDescription(jobDescription)
        }
    });

    useEffect(() => {
        return () => {
            // const jobTitle = document.querySelector(".job-details-jobs-unified-top-card__content--two-pane")
            // const jobDescription = document.querySelector(".jobs-description__container #job-details > span")
            // setJobTitle(jobTitle)
            // setJobDescription(jobDescription)
        }
    }, []);


    function generatePrompt() {
        const jobDescription = document.querySelector(".job-details-jobs-unified-top-card__content--two-pane").textContent.trim().replace(/\n|\r/g, "")
        const jobRequirements = document.querySelector(".jobs-description__container #job-details > span").textContent.trim().replace(/\n|\r/g, "")

        form.setFieldsValue({
            profile: 'N/A',
            description: jobDescription,
            requirements: jobRequirements,
            prompt: gptPrompt(jobDescription, jobRequirements),
        });
    }

    function onFinish(values) {
        fetch("http://www.localhost:3000/api/sorcery", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "prompt": values.prompt,
                "jobDescription": values.profile
            }),
            redirect: 'follow'
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (result) {
                console.log('res--------------------: ', result.coverLetter)
                form.setFieldValue('cover', result.coverLetter)
            })
            .catch(function (error) {
                console.log('error', error)
            });
    }

    function onReset() {
        form.resetFields();
    };

    return (
        <>
            <div className='floating-button'>
                <Tooltip title="Create Cover Letter" placement="left">
                    <Button type="primary" icon={<ImportOutlined />} size="large" onClick={() => setModaOpen(true)}></Button>
                </Tooltip>
            </div>


            <Modal
                centered
                open={modaOpen}
                width={1000}
                onOk={() => setModaOpen(false)}
                onCancel={() => setModaOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setModaOpen(false)}>
                        Close
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        profile: 'N/A',
                        description: 'N/A',
                        requirements: 'N/A',
                        prompt: 'N/A',
                    }}
                    autoComplete="off">

                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Button type="primary" size="large" onClick={() => generatePrompt()}>Generate Prompt</Button>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Your Bio" name="profile">
                                <Input.TextArea rows={6}></Input.TextArea>
                            </Form.Item>

                            <Form.Item label="Job Description" name="description">
                                <Input.TextArea rows={6}></Input.TextArea>
                            </Form.Item>

                            <Form.Item label="Job Requirements" name="requirements">
                                <Input.TextArea rows={6}></Input.TextArea>
                            </Form.Item>

                            <Form.Item label="GPT prompt" name="prompt">
                                <Input.TextArea rows={6}></Input.TextArea>
                            </Form.Item>

                            <Form.Item label="Cover Letter" name="cover">
                                <Input.TextArea rows={6}></Input.TextArea>
                            </Form.Item>

                            <Form.Item>
                                <Space>
                                    <SubmitButton form={form} />
                                    <Button htmlType="reset" onClick={onReset}>Reset</Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>



        </>
    );
}
