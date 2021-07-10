import './App.css';
import React,{useState,useEffect} from 'react';

function App() {

  const [categories,setCategories]=useState([])
  const [selectedCategory,setSelectedCategory]=useState()

  const fetchCategories=async ()=>{
    console.log('this will fetch the categoies')
    let res=await fetch (`http://localhost:3000/api/v1/categories`)
    let data=await res.json()
    console.log(data)
    setCategories(data)
    }
  

  useEffect( ()=>{
    //this code will run only once on component mount
    fetchCategories();

  },[])

   useEffect( ()=>{
     //this code is going to run whenever the selectedCategory changes
     //fetchQuestions();fetch and show the questions
    

  },[selectedCategory])


  return (
    <>
    <div className="grid grid-cols-12">
    <div className ={'col-span-full border p-5'}>
    <h1 className={'text-center text-3xl'}>App Title</h1></div>
    </div>

    <div className="grid grid-cols-12">
    <div className ={'col-span-full md:col-span-3 lg:col-span-2 border p-5'}>
    {/*<h1 className={'text-center text-3xl'}>Categories List</h1>*/}
    <ul>
    {categories.map((category,index)=>{
      return<li key={index} className={category.id==selectedCategory ? 'border p-5 cursor-pointer bg-gray-200' : 'border p-5 cursor-pointer'} onClick = {()=> {
           setSelectedCategory(category.id)
           
      }}>
      
      {category.name}
             </li>

    })}
    </ul>
    </div>
    

     <div className ={'col-span-full md:col-span-9 lg:col-span-10 border p-5'}>
    <h1 className={'text-center text-3xl'}>Blank space</h1></div>
    </div>

    
    </>
  );
}

export default App;
