import React, { useState } from 'react'

export const FormWithoutYup = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interest: [],
        bithDate: ""
    });

    const validateForm = () => {

    }

    const handleSubmit = (e) => {
       e.preventDefault();

       const isValid = validateForm();
       if(isValid) {
        console.log('Form Submitted', formData)
       } else {
        console.log('Form validation Failed')
       }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
       const { name, checked } = e.target;
        let updatedInterests = [...formData.interest];
        if(checked) {
           updatedInterests.push(name);
        }else {
           updatedInterests = updatedInterests.filter(
            (interest) => interest !== name
           )
        }

        setFormData({
            ...formData,
            interest: updatedInterests
        })
    };
  return (
    <div>
        <form className='form' onSubmit={handleSubmit}>
            <div>
        <label htmlFor="firstName">First Name: </label>
        <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Enter your first name' />
        </div>

        <div>
        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Enter your last name' />
        </div>

       <div> 
        <label htmlFor="email">Email: </label>
        <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
        </div>

        <div>
        <label htmlFor="phoneNumber">Phone Number: </label>
        <input type="text" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} placeholder='Enter your phone number' />
        </div>

        <div>
        <label htmlFor="password">Password: </label>
        <input type="text" name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' />
        </div>

        <div>
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input type="text" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Enter your password' />
        </div>

        <div>
        <label htmlFor="age">Age: </label>
        <input type="number" name='age' value={formData.age} onChange={handleChange} placeholder='Enter your age' />
        </div>

        <div>
        <label htmlFor="gender">Gender: </label>
        <select name='gender' value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        </div>

        <div>
        <label htmlFor="interest">Interest: </label>
        <label ><input type="checkbox" name='coding' value={formData.interest.includes("coding")} onChange={handleCheckboxChange}/>Coding</label>
        <label ><input type="checkbox" name='sports' value={formData.interest.includes("sports")} onChange={handleCheckboxChange}/>Sports</label>
        <label ><input type="checkbox" name='reading' value={formData.interest.includes("reading")} onChange={handleCheckboxChange}/>Reading</label>
        </div>

        <div>
        <label htmlFor="birthdate">Date of Birth: </label>
        <input type="date" name='birthdate' value={formData.bithDate} onChange={handleChange} placeholder='Enter your bithdate' />
        </div>

        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
