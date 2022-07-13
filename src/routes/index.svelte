<script>
    import { products } from '../lib/components/products'
    import Carousel from '../lib/components/Carousel.svelte'
</script>

<svelte:head>
    <title>Homzon: Home</title>
</svelte:head>

<Carousel />

<h1 class='my-5 text-center font-bold'>Products</h1>
<div class='flex flex-wrap -mx-4 justify-center'>
    {#each products as product (product.id)}
    <div class='w-full p-4 max-w-sm'>
        <a href={'product/'+product.id} class='c-card block bg-white shadow-md hover:shadow-xl rounded-sm overflow-hidden'>
        <div class='relative pb-2 overflow-hidden'>
          <img class='relative inset-0 h-60 w-full object-contain' src={product.image} alt={product.name}>
        </div>
        <div class='p-4'>
          <h2 class='mt-2 mb-2  font-bold'>{product.name}</h2>
          <p class='text-sm'>{product.description.substring(0, 45)}...</p>
          <div class='mt-3 flex items-center'>
            <span class='text-sm font-semibold'>usd</span>&nbsp;<span class='font-bold text-xl'>{product.amount}</span>&nbsp;<span class='text-sm font-semibold'>€</span>
          </div>
        </div>
        </a>
    </div>
    {/each}
</div>

<!-- <div class='flex flex-wrap -mx-4'> -->
    <!-- <div class='max-w-sm bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <a href={'product/'+product.id}>
            <img class='rounded-t-lg sm pt-2' src={product.image} alt={product.name} />
        </a>
        <div class='p-2'>
            <a href={'product/'+product.id}>
                <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{product.name}</h5>
            </a>
            <p class='mb-2 font-normal text-gray-700 dark:text-gray-400'>{product.description.substring(0, 45)}...</p>
        </div>
    </div> -->
<!-- </div> -->