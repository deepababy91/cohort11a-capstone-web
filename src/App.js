import './App.css';
import React,{useState,useEffect} from 'react';
import {List,Collapse,Button} from 'antd'
const { Panel } = Collapse;
function App() {

  const [categories,setCategories]=useState([])//empty array
  const [selectedCategory,setSelectedCategory]=useState()
  const [questions,setQuestions]=useState()
  const [questionTxt,setQuestionTxt]=useState()

  let apiUrl=process.env.REACT_APP_API_URL || 'https://cohort-capstone-api.herokuapp.com'

  const fetchCategories=async ()=>{
    console.log('this will fetch the categories')
    let res=await fetch (`${apiUrl}/api/v1/categories`)
    let data=await res.json()
    console.log(data)
    setCategories(data)
    }

  const  fetchQuestionsForCategory =async(id) =>{
      console.log('fetch questions for this category id ',id)
      let res=await fetch (`${apiUrl}/api/v1/categories/${id}/questions`)
      let data=await res.json()
      console.log(data)
      setQuestions(data)

  }

  const createNewQuestion = async ()=>{
console.log('create a new quetsion for the category id ',selectedCategory)
 let res=await fetch (`${apiUrl}/api/v1/categories/${selectedCategory}/questions`, 
 {method:'POST',
 headers:{
         'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
 },
 body:JSON.stringify({questionTxt:questionTxt})

 })
fetchQuestionsForCategory(selectedCategory)
setQuestionTxt('')
//usual fetch request -POST
//make a POST request to create a question
//once the call is successful
//fetch the questions for a category again (reload the questions)
//done!
  }
  

    /*const fetchQuestions=async ()=>{
    console.log('this will fetch the questions')
    let res=await fetch (`http://localhost:3000/api/v1/categories/:categoryId/questions`)
    let data=await res.json()
    console.log("questions", data)
   
    }*/
    const createANewAnswer=async ()=>{
 //you will need something called selectedQuestion to keep a track of the question that has been selected 
 //state variable to store the answer text
//usual fetch request -POST
//make a POST request to create an answer
//once the call is successful
//fetch the questions for a category again (reload the questions)
//done!
    }

  useEffect( ()=>{
    //this code will run only once on component mount
    fetchCategories();

  },[])

   /*useEffect( ()=>{
     //this code is going to run whenever the selectedCategory changes
     fetchQuestions();//fetch and show the questions
    

  },[selectedCategory])*/


  return (
    <>
   
    <div className="grid grid-cols-12">
    <div className ={'col-span-full border p-5'}>
    <h1 className={'text-center text-3xl'}>Questions App</h1></div>
    </div>

    <div className="grid grid-cols-12">
    <div className ={'col-span-full md:col-span-3 lg:col-span-2 border p-5'}>
   {/* <h1 className={'text-center text-3xl'}>Currently selected category is :{selectedCategory}</h1>*/}
   {/* <ul>
    {categories.map((category,index)=>{
      return<li key={index} className={category.id===selectedCategory ? 'border p-5 cursor-pointer bg-gray-200' : 'border p-5 cursor-pointer'} onClick = {()=> {
           setSelectedCategory(category.id)
           fetchQuestionsForCategory(category.id)
           
      }}>
      
      {category.name}
             </li>

    })}
  </ul>*/}


    <List
      size="Large"
      header={<div className={'font-bold'}>Categories List</div>}
      //footer={<div>Footer</div>}
      bordered
      dataSource={categories}
      renderItem={item => <List.Item>
        
        <div className={item.id===selectedCategory ? 'cursor-pointer text-blue-500 font-bold' : 'cursor-pointer'} onClick = {()=> {
           setSelectedCategory(item.id)
           fetchQuestionsForCategory(item.id)   
      }}>
      {item.name}
      </div>
      </List.Item>}
        />
    </div>

     <div className ={'col-span-full md:col-span-9 lg:col-span-10 border p-5'}>
    {/*<h1 className={'text-center text-3xl'}>Blank space</h1>*/}

    {/*<button className={'border p-2 pl-4 pr-4 bg-gray-200'} onClick={createNewQuestion}>New Question</button>*/}
    {selectedCategory && <div>
    
<input value={questionTxt} onChange={(ev)=>{
      setQuestionTxt(ev.currentTarget.value)
    }}type="text"  className={'border p-1 mr-5 w-2/3'}/>
    <Button type={'primary'} onClick={createNewQuestion}>Create new Question</Button>
    <br/>
    <br/>
    </div>}
    
    
   {/* <ul>
    {questions && questions.map((question)=>{
     return <li key={question.id}>
    {question.questionTxt} {question.Answers.length > 0 && <span>-<span>{question.Answers.length}</span></span>}
     </li>
    })}
  </ul>*/}

{selectedCategory && <div>
<Collapse accordion>

   {questions && questions.map((question,index)=>{
     return  <Panel header={question.questionTxt} key={index}>
      <List
      size="small"
      //header={<div className={'font-bold'}>Answers List</div>}
      footer={<div>
        <input value={questionTxt} onChange={(ev)=>{
      setQuestionTxt(ev.currentTarget.value)
    }}type="text"  className={'border p-1 mr-5 w-2/3'}/>
    <Button type={'primary'} onClick={createANewAnswer}>Add Answer</Button>
        
        </div>}
      bordered
      dataSource={question.Answers}
      renderItem={answer => <List.Item>
        
        <div>
      {answer.answerTxt}
      </div>
      </List.Item>}
        />
    </Panel>
        })}
  </Collapse>

</div>}
{!selectedCategory && <h1 className={'text-center text-xl uppercase tracking-wider text-blue-500'}>Select a Category to get started</h1>}
   

    
    {/*if the questions exists show it stringify on the screen
    {questions && <p>{JSON.stringify(questions)}</p>}*/}
     
    </div>
    </div>

    
    </>
  );
}

export default App;
