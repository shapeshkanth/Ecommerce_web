 const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin ">
            <span className="sr-only ">loading...</span>
        </div>
    </div>
  )
}
export default Loading