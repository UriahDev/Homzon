<script> 
  import { app } from './fb'
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged  } from 'firebase/auth'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte/internal'

  let  avatar, fileinput, isRegister = true

  onMount(() => {
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        goto('/profile')
      }
    })
  })

  const onSubmit = (e) => {
        const formData = new FormData(e.target)

        const data = {};
        for (let field of formData) {
        const [key, value] = field
        data[key] = value
        }
        userFunction(data)
      }
      
      const onFileSelected =(e)=>{
        let image = e.target.files[0];
        let reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = e => {
          avatar = e.target.result
        }
      }
      
      const isRegisterFnc = () => {
        isRegister ? isRegister = false : isRegister = true
      }
      
      const userFunction = (data) => {
        const auth = getAuth(app)
        let email = data.email, password = data.password, confirm_password = data.confirm_password, username = data.firstname + ' ' + data.lastname
        if(isRegister === true) {
          if (password === confirm_password) {
            if(password.length < 7) {
              alert('Password characters should be greater than 6')
            } else {
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in 
                  updateProfile(auth.currentUser, {
                    displayName: username,
                  }).then(() => {
                    // Profile updated!
                  }).catch((error) => {
                    // An error occurred
                  })
                  goto('/profile')
                })
                .catch((error) => {
                  const errorCode = error.code
                  const errorMessage = error.message
                  // ..
                })
            }
          } else alert('Entered password does not match!')
        } else {
          if(password.length > 6 && email.length !== 0 || email === undefined ) {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user
              // ...
              goto('/profile')
            })
            .catch((error) => {
              const errorCode = error.code
              const errorMessage = error.message

              console.log(errorCode, errorMessage)
            })
          } else alert('Password should be greater than 6, and email should not be empty')
        }
      }
</script>

<h1 class='text-center font-bold dark:text-white mt-4'>{isRegister ? 'Create an account': 'Login to account'}</h1>
<div id='app'>
    {#if isRegister === true}
	<!-- <h1>Upload Image</h1> -->
        {#if avatar}
        <img class='avatar' src='{avatar}' alt='d' />
        {:else}
        <img class='avatar' src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png' alt='' /> 
        {/if}
				<!-- <img class='w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500' src='https://static.thenounproject.com/png/625182-200.png' alt='' on:click={()=>{fileinput.click()}} />
        <div class='chan' on:click={()=>{fileinput.click()}}>Choose Image</div>
        <input style='display:none' type='file' accept='.jpg, .jpeg, .png' on:change={(e)=>onFileSelected(e)} bind:this={fileinput} > -->
    {:else}
        <img class='avatar' src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png' alt='' />
    {/if}

        <form class='w-full max-w-lg giveSpace' on:submit|preventDefault={onSubmit}>
            {#if isRegister === true}
            <div class='flex flex-wrap -mx-3 mb-6'>
                <div class='w-sm mx-auto sm:w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label name='fname' class='block uppercase dark:text-white tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-first-name'>
                    First Name
                  </label>
                  <input class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-first-name' type='text' placeholder='firstname' value='' name='firstname'>
                </div>
                <div class='w-sm mx-auto sm:w-full md:w-1/2 px-3'>
                  <label name='lname' class='block uppercase dark:text-white tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-last-name'>
                    Last Name
                  </label>
                  <input value='' class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-last-name' type='text' placeholder="lastname" name='lastname'>
                </div>
              </div>
            {/if}
            <div class='flex flex-wrap -mx-3 mb-6'>
                <div class='w-sm mx-auto sm:w-full px-3'>
                  <label name='mail' class='block dark:text-white uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-password'>
                    Email
                  </label>
                  <input name='email' class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-password mail' type='email' value='' placeholder='example@gmail.com' />
                </div>
            </div>
            <div class='flex flex-wrap -mx-3 mb-6'>
              <div class='w-sm mx-auto sm:w-full px-3'>
                <label name='pass' class='block dark:text-white uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-password'>
                  Password
                </label>
                <input name='password' class='appearance-none dark:text-white block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-password pass' type='password' value='' placeholder='*************'>
                {#if isRegister === true}
                    <p class='text-gray-600 text-xs italic'>Include atleaset a symbol</p>
                {/if}
              </div>
            </div>
            {#if isRegister === true}
                <div class='flex flex-wrap -mx-3 mb-6'>
                    <div class='w-sm mx-auto sm:w-full px-3'>
                    <label name='cPass123' class='block uppercase dark:text-white tracking-wide text-gray-700 text-xs font-bold mb-2' for='grid-password'>
                        Confirm Password
                    </label>
                    <input name='confirm_password' class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='grid-password cPass' type='password' value='' placeholder='*************'>
                    </div>
                </div>
                <p class='text-center'>Have an account already <button on:click={isRegisterFnc}><strong>Login</strong></button></p>
            {/if}
            {#if isRegister === false}
                <p class='text-center'>Don't have an account <button on:click={isRegisterFnc}><strong>Register</strong></button></p>
            {/if}
            <div class='center'>
                <button class='btn btn-wide center' name='submit' type='submit'>Submit </button>
            </div>
        </form>
</div>


<style>
  .center {
    display: grid;
    place-items: center;
    margin-top: 10px;
  }
  .giveSpace {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #app{
	  display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
  }
	.upload{
		display:flex;
	  height:50px;
		width:50px;
		cursor:pointer;
	}
	.avatar{
	  display:flex;
		height:200px;
		width:200px;
	}
</style>