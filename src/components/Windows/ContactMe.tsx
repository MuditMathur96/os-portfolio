import React, { FormEvent, useRef, useState } from 'react'
import Window from '../Window';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import emailjs from '@emailjs/browser';

type Props = {}
const inputs =[
    {
        name:"from_name",
        placeholder:"Enter your name",
        type:"text"
       
    },
    {
        name:"email",
        placeholder:"Enter your email",
        type:"email"
       
    },
     {
        name:"message",
        placeholder:"Enter message",
        type:"rich-text"
    }
]

function ContactMe({}: Props) {

    const formRef = useRef<HTMLFormElement>(null);
    const [data,setData] = useState({});
    const [isSubmitted,setIsSubmitted] = useState<boolean>(false);

    const handleFormSubmission =async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!formRef.current) return;
        console.log(data);
        setIsSubmitted(true);
        try{

            await emailjs.send(process.env.EMAILJS_SERVICE || "",
                process.env.EMAILJS_TEMPLATE || "",
                data,
                process.env.EMAILJS_KEY || "");
        }catch(e){
            alert("Could not send the email successfully! Please try again later")
        }   
        
    }

  return (
    <Window
    title="Contact Me"
    type='Contact_Me'
    >
        <div >
            <form 
            ref={formRef}
            className='flex flex-col items-center w-full space-y-3 py-2 px-2 md:py-12 md:px-12'
            onSubmit={handleFormSubmission}>

                {inputs.map(i=>i.type==="rich-text"?
                <CKEditor
                disabled={isSubmitted}
                onChange={(e,editor)=>{
                    setData(prev=>({...prev,[i.name]:editor.getData()}))
                }}
                editor={ClassicEditor}
                />
                :<input 
                key={i.name}
                disabled={isSubmitted}
                onChange={e=>{
                    setData(prev=>({...prev,[i.name]:e.target.value}))
                }}
                placeholder={i.placeholder}
                className='border w-full rounded-md p-2'
                name={i.name}
                type={i.type}
                required
                />)}
                <button
                disabled={isSubmitted}
                className={`
                h-4-w-4 
                ${isSubmitted?" bg-green-500":"bg-blue-600"}
                 p-2 
                text-white rounded-md w-full`}>
                    {isSubmitted?"Message sent!":"Submit"}
                </button>
            </form>

        </div>
    </Window>
  )
}

export default ContactMe