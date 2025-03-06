
import { MoonLoader } from "react-spinners";

const SuspenseLoader = () =>{
	return (
		<div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-white backdrop-blur-sm bg-opacity-5 ">
				<MoonLoader className="h-10 w-10" />
		</div>
	)
}

export default SuspenseLoader;