import { useEffect } from 'react';
import React, { useState } from 'react';
import { ImportOutlined } from '@ant-design/icons';
import { Modal, Button, Tooltip, Input } from 'antd';


export default function App() {

    const [modaOpen, setModaOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')


    const gptPrompt = `You are a skilled and enthusiastic [Your Profession] applying for the [Job Title] position at [Company Name]. Your goal is to create a compelling cover letter that highlights your qualifications and expresses your interest in the role. The job description and company details are provided in the HTML text below:

    ---
    
    **Job Description:**
    ${jobDescription.textContent}
    
    **Company Details:**
    ${jobTitle.textContent}
    
    ---
    
    Now, please craft a persuasive cover letter addressing the key points mentioned in the job description and showcasing how your skills and experiences align with the company's values and requirements. Feel free to personalize the letter as needed.`


    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message === 'ON_URL_CHANGE') {
            const jobTitle = document.querySelector(".job-details-jobs-unified-top-card__content--two-pane")
            const jobDescription = document.querySelector(".jobs-description__container #job-details > span")
            setJobTitle(jobTitle)
            setJobDescription(jobDescription)
        }
    });

    useEffect(() => {
        return () => {
            const jobTitle = document.querySelector(".job-details-jobs-unified-top-card__content--two-pane")
            const jobDescription = document.querySelector(".jobs-description__container #job-details > span")
            setJobTitle(jobTitle)
            setJobDescription(jobDescription)
        }
    }, []);


    function generateCoverLetter() {
        setPrompt(gptPrompt.trim().replace(/\n|\r/g, ""))
    }

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
                <Button type="primary" size="large" onClick={() => generateCoverLetter()}>Generate Cover Letter</Button>
                <Input.TextArea rows={6} value={prompt}></Input.TextArea>
            </Modal>

        </>
    );
}
