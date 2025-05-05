import React from 'react'

const LoginForm = ({SubmitForm, setUsername, setPassword, username, password}) => {
  return (
    <section className="flex w-full justify-center items-center min-h-screen">
      <form
        className="shadow-lg rounded-2xl p-8 w-full max-w-xl space-y-6"
        onSubmit={SubmitForm}
        id="form"
      >
        <label htmlFor="">Login Information</label>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="text-2xl text-black bg-amber-50 w-full hover:text-blue-900 cursor-pointer">
          Login
        </button>
      </form>
    </section>
  )
}

export default LoginForm