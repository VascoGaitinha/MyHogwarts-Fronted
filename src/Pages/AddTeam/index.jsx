import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context";

const AddTeam = () => {



    const {BACKEND} = useContext(AuthContext);
    const [form, setForm] = useState({
        name: "",
        logo: "",
        badge: "",
        banner:""
    });

    const addQuizz = () => {
        const newQuizz = {
            name: "Wizarding World Timeline",
            description: "Embark on a journey through the magical timeline of the Wizarding World.",
            questions: [
              {
                question: " When did Harry learn Accio?",
                answers: [
                  { option: " Year 3", correct: true },
                  { option: " Year 4", correct: false },
                ],
              },
              {
                question: " When is Neville's birthday?",
                answers: [
                  { option: " July 30", correct: true },
                  { option: " August ", correct: false },
                ],
              },
              {
                question: " What is Snape's birthday?",
                answers: [
                  { option: " 9 January 1960", correct: true },
                  { option: " 22 August 1963", correct: false },
                ],
              },
              {
                question: " When did the Hogwarts battle happen?",
                answers: [
                  { option: " May 2 1998", correct: true },
                  { option: " April 3 1997", correct: false },
                ],
              },
              {
                question: " When did Harry start going to Hogwarts?",
                answers: [
                  { option: " September 1 1991", correct: true },
                  { option: " September 1 1926", correct: false },
                ],
              },
            ],
           
          };
          
          

          
      
        axios.post(`${BACKEND}/api/quizz`, newQuizz)
          .then(() => {
            alert("Quiz added successfully");
          })
          .catch((error) => {
            console.error("Error adding quiz:", error);
          });
      };

    const  imgToB64 = (file) =>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) =>{
                reject(error)
            }
        })
        } 

        const handleFile = async (e, field) => {
            try {
                if (e.target.files && e.target.files.length > 0) {
                    const convImg = await imgToB64(e.target.files[0]);
                    setForm((prev) => ({
                        ...prev, [field]: convImg
                    }))
                }
            } catch (error) {
                console.error(error);
            }
        };

        const handleTyping = (e, field) => {
            setForm((prev) => ({
                ...prev, [field]: e
            }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            const requestBody =  form;
            console.log(requestBody)

            axios.post(`${BACKEND}/api/teams`, requestBody)
                .then((response)=> {
                    res.status(200).json(response)
                })
                .catch((error)=>{
                   console.log(error)
                })
        }

        


    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input label="name" onChange={(e)=> handleTyping(e.target.value, "name")}></input>
            <label>logo</label>
            <input type="file" onChange={(e) => handleFile(e, "logo")}></input>
            <label>badge</label>
            <input type="file" onChange={(e) => handleFile(e, "badge")}></input>
            <label>banner</label>
            <input type="file" onChange={(e) => handleFile(e, "banner")}></input>
            <button type="submit">ADD</button>
        </form>
        <button onClick={addQuizz}>Add Quizz</button>
        </div>

    )
}

export default AddTeam;