import { useState } from "react"
import { SERVER_URL, EMAIL_REGEX, PASSWORD_REGEX } from "../Config"
import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState([])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL_REGEX.test(formData.email)) {
      alert("Invalid Email Address")
      return
    }
    if (!PASSWORD_REGEX.test(formData.password)) {
      alert("Password must contain at least 8 characters, 1 number, 1 uppercase and 1 lowercase")
      return
    }
    const response = await fetch(`${SERVER_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    if (response.ok) {
      localStorage.setItem("token", data.token)
      navigate("/login")
    }
    else{
      alert(data.message)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
