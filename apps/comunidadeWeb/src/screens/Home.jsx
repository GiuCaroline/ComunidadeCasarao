export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen w-screen bg-branco dark:bg-preto-dark text-preto">
        <img 
          src="/images/logoPreto.png"
          className="w-auto h-[10vh] md:h-[80vh] object-cover selection:bg-branco"
        />
      <div className="mt-[25%]">
        <img 
          src="/images/banner.png"
          className="w-auto h-[40vh] md:h-[80vh] object-cover selection:bg-branco ml-[5%]"
        />
      </div>

      <button className="bg-vermelho text-branco font-light px-10 mt-[15%] py-2 text-xl rounded-full" 
      onClick={()=>{window.location="/Login"}}>Login</button>
    </div>
  )
}
