import { ShoppingBag } from "react-feather";

const EmptyProduct = ()=>{
    return (
        <>
            <h1 className="my-12 text-center text-4xl font-semibold">Empty</h1>
            <div className="h-full flex flex-col justify-center items-center">
            <ShoppingBag size={160} />
            </div>
        </>
    )
}

export default EmptyProduct;