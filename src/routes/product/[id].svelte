<script>
    import { page } from '$app/stores'
    import { products } from '../../lib/components/products'
    import { allProducts } from './stores'
    
    
    const pid = $page.params.id
    const product = products.find(element => element.id == pid)

    const addProduct = () => {
        $allProducts = [...$allProducts, product]
    }
</script>

<svelte:head>
    <title>Homzon: Product</title>
</svelte:head>

<div class='md:flex md:max-h-screen flex-col justify-center overflow-hidden bg-gray-50'>
    <div class='bg-white px-6 py-5 sm:mx-auto sm:max-w-lg sm:px-10'>
        <div class='max-w-sm bg-white mb-4 dark:bg-gray-800 dark:border-gray-700'>
            <img class='rounded-t-lg object-contain' src={product.image} alt='' />
        </div>
        <div class='mx-auto max-w-md'>
            <h3 class='font-bold'>{product.name.toUpperCase()}</h3>
            <div class='space-y-6 py-4 text-base leading-7 text-gray-600'>
                <p>{product.description}</p>
                <button on:click={addProduct} type='button' class='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Add To Cart</button>
            </div>
        </div>
    </div>
</div>