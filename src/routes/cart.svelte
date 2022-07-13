<script>
  import { onMount } from 'svelte/internal'
  import { allProducts, total, subtotal, shipping, tax } from './product/stores'
  import { browser } from '$app/env'

  onMount(() => {
    $allProducts = [...$allProducts]
  })

  const onSubmit = (e) => {
        const formData = new FormData(e.target)

        const data = {};
        for (let field of formData) {
        const [key, value] = field
        data[key] = value
        }
        console.log(data)
  }

  const removeItem = (prod) => {
    const index = $allProducts.indexOf(prod)

    if(index > -1) $allProducts.splice(index, 1)

    $subtotal = $subtotal - prod.amount
    $subtotal <= 10 && ($subtotal = 0)
    subtotal.update( val => val = $subtotal)

    $total = $total - prod.amount
    $total <= 10 && ($total = 0)
    total.update( val => val = $total)

    allProducts.subscribe(val => browser && (localStorage.allProducts = JSON.stringify(val)))
    $allProducts = $allProducts
  }
  
  $allProducts.map(item => $subtotal = $subtotal + item.amount)
  $subtotal > 0 && ($total = $subtotal + shipping + tax)
</script>

<div class='bg-white'>
    <!-- Background color split screen for large screens -->
    <div class='hidden lg:block fixed top-0 left-0 w-1/2 bg-white' aria-hidden='true'></div>
    <div class='hidden lg:block fixed top-0 right-0 w-1/2 bg-slate-800' aria-hidden='true'></div>
  
    <main class='relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2'>
      <h1 class='sr-only'>Checkout</h1>
  
      <section aria-labelledby='summary-heading' class='bg-slate-800 text-white pt-6 pb-12 md:px-10'>
        <div class='max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0'>
          <h2 id='summary-heading' class='sr-only'>Order summary</h2>
  
          <dl>
            <dt class='text-sm font-medium'>Estimated Total</dt>
            <dd class='mt-1 text-3xl font-extrabold text-white'>${$total}.00</dd>
          </dl>
  
          <ul role='listbox' class='text-sm font-medium divide-y divide-white divide-opacity-10'>
            {#each $allProducts as aProduct, i}
              <li class='flex items-start py-6 space-x-4'>
                <img src={aProduct.image} alt={aProduct.name} class='flex-none w-20 h-20 rounded-md object-center object-cover'>
                <div class='flex-auto space-y-1'>
                  <h3 class='text-white mt-8'>{aProduct.name}</h3>
                  <!-- <p>White and black</p>
                  <p>15L</p> -->
                </div>
                <div class='grid grid-rows-2 place-items-center'>
                  <p class='flex-none text-base font-medium text-white'>${aProduct.amount}</p>
                  <button type='button' class='text-white border border-gray-50 rounded:md p-1.5' on:click={() => removeItem(aProduct)}>Remove</button>
              </div>
              </li>
              {/each}
            </ul>
  
          <dl class='text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6'>
            <div class='flex items-center justify-between font-semibold'>
              <dt>Subtotal</dt>
              <dd>${$subtotal}.00</dd>
            </div>
  
            <div class='flex items-center justify-between'>
              <dt>Shipping</dt>
              <dd>${shipping}.00</dd>
            </div>
  
            <div class='flex items-center justify-between'>
              <dt>Taxes</dt>
              <dd>${tax}.00</dd>
            </div>
  
            <div class='flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6'>
              <dt class='text-base font-bold'>Total</dt>
              <dd class='text-base font-semibold'>${$total}.00</dd>
            </div>
          </dl>
        </div>
      </section>
  
      <section aria-labelledby='payment-and-shipping-heading' class='py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1'>
        <h2 id='payment-and-shipping-heading' class='sr-only'>Payment and shipping details</h2>
  
        <form on:submit|preventDefault={onSubmit}>
          <div class='max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0'>
            <div>  
            <div class='mt-10'>
              <h3 id='shipping-heading' class='text-lg font-bold text-gray-900'>Shipping address</h3>
  
              <div class='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3'>
                <div class='sm:col-span-3'>
                  <label for='address' class='block text-sm font-medium text-gray-700'>Address</label>
                  <div class='mt-1'>
                    <input type='text' id='address' name='address' autocomplete='street-address' class='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                  </div>
                </div>
  
                <div>
                  <label for='city' class='block text-sm font-medium text-gray-700'>City</label>
                  <div class='mt-1'>
                    <input type='text' id='city' name='city' autocomplete='address-level2' class='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                  </div>
                </div>
  
                <div>
                  <label for='region' class='block text-sm font-medium text-gray-700'>State / Province</label>
                  <div class='mt-1'>
                    <input type='text' id='region' name='region' autocomplete='address-level1' class='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                  </div>
                </div>
  
                <div>
                  <label for='postal-code' class='block text-sm font-medium text-gray-700'>Postal code</label>
                  <div class='mt-1'>
                    <input type='text' id='postal-code' name='postal-code' autocomplete='postal-code' class='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                  </div>
                </div>
              </div>
            </div>
  
            <div class='mt-10'>  
            <div class='mt-10 flex justify-end pt-6 border-t border-gray-200'>
              <button type='submit' class='bg-slate-800 border border-transparent rounded-sm shadow-sm py-2 px-8 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'>Purchase</button>
            </div>
          </div>
        </form>
      </section>
    </main>
  </div>