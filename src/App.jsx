export const App = () => {
  
 return <div className="AppHeader">
          <h2>TodoList</h2>
          <Button titre="+ New Task"/>
        </div>
              
        
}

export const Button = ({titre,className=""}) => {
  return  ( 
  <div className="Button"> <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className}`}>{titre}</button> </div> )
}

  