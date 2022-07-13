import { writable } from 'svelte/store'
import { browser } from '$app/env'

const storedProducts = browser && JSON.parse(localStorage.getItem('allProducts')) || []

export const allProducts = writable(
    storedProducts
)

allProducts.subscribe(val => browser && (localStorage.allProducts = JSON.stringify(val)))

export let total = writable(0), subtotal = writable(0), shipping = 5, tax = 5

total.subscribe(val => val)
subtotal.subscribe(val => val)