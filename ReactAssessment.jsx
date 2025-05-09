import React, { useState } from "react";

const Login = () => {
const [formData, setFormData] = useState({
username: "",
password: "",
email: "",
phone: "",
});

const handleChange = (e) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};

return (
<div>
<div>
<label>Username:</label>
<input
type="text"
name="username"
value={formData.username}
onChange={handleChange}
/>
</div>
<div>
<label>Password:</label>
<input
type="password"
name="password"
value={formData.password}
onChange={handleChange}
/>
</div>
<div>
<label>Email:</label>
<input
type="email"
name="email"
value={formData.email}
onChange={handleChange}
/>
</div>
<div>
<label>Phone:</label>
<input
type="text"
name="phone"
value={formData.phone}
onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
/>
</div>

<div>
<h3>Form Data:</h3>
<pre>{JSON.stringify(formData, null, 2)}</pre>
</div>
</div>
);
};

export default Login;



//Four input fields: username, password, email, and phone

//Single handleChange function handles state updates for all fields except phone.

//Inline change handler is applied only to the phone field to demonstrate state update without the general handleChange method.
