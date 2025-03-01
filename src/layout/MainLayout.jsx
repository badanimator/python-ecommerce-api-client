import Header from "../components/Header";


const MainLayout = ({children, title})=>{
  return (
    <>
      <Header title={title} />
      <div className="w-full min-h-screen bg-gray-100 pb-10">
        { children }
      </div>
    </>
  )
}

export default MainLayout;