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
        birthDate: ""
    });

    const [errors, setErrors] = useState();

    const isValidEmail = (email) => {
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(email);
    }

    const isValidPhoneNumber = (phoneNumber) => {
       const phoneRegex = /^\d{10}$/;
       return phoneRegex.test(phoneNumber);
    }

    const isValidPassword = (password) => {
        const symbolRegex = /[!@$%^&*(),.?":{}|<>]/;
        const numberRegex = /[0-9]/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        return (
            password.length >= 8 &&
            symbolRegex.test(password) &&
            numberRegex.test(password) &&
            uppercaseRegex.test(password) &&
            lowercaseRegex.test(password)
        )        
    }

    const isValidAge = (age) => {
       return parseInt(age) >= 18 && parseInt(age) <= 100;
    }

    const validateForm = () => {
      let newErrors = {};
    
      if(!formData.firstName) {
        newErrors.firstName = "First Name is required";
      }
      if(!formData.lastName) {
        newErrors.lastName = "Last Name is required";
      }
      if(!formData.email) {
        newErrors.email = "Email is required";
      } else if(!isValidEmail(formData.email)) {
        newErrors.email  = "Invalid email format"
      }
      if(!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone Number required"
      } else if(!isValidPhoneNumber(formData.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be 10 digits"
      }
      if(!formData.password) {
        newErrors.password = "Password is required"
      } else if(!isValidPassword(formData.password)) {
        newErrors.password = "Password must be 8 characters long and contain at least one number, one symbol, one uppercase, one lowercase"
      }
      if(!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required"
      } else if(formData.confirmPassword !== formData.formData) {
        newErrors.confirmPassword = "Password must match"
      }
      if(!formData.age) {
        newErrors.age = "Age is required"
      } else if(!isValidAge(formData.age)) {
        newErrors.age = "You must be at least 18 years old and not older than 100 years"
      }
      if(!formData.gender) {
        newErrors.gender = "Gender is Required"
      }
      if(!formData.interest.length === 0) {
        newErrors.interest = "Select at lease one interest"
      }
      if(!formData.bithDate) {
        newErrors.bithDate = "Date of birth is required"
      }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0;

    };

    console.log(errors);


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
        {errors?.firstName && <div className='error'>{errors.firstName}</div>}
        </div>

        <div>
        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Enter your last name' />
        {errors?.lastName && <div className='error'>{errors.lastName}</div>}
        </div>

       <div> 
        <label htmlFor="email">Email: </label>
        <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
        {errors?.email && <div className='error'>{errors.email}</div>}
        </div>

        <div>
        <label htmlFor="phoneNumber">Phone Number: </label>
        <input type="text" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} placeholder='Enter your phone number' />
        {errors?.phoneNumber && <div className='error'>{errors.phoneNumber}</div>}
        </div>

        <div>
        <label htmlFor="password">Password: </label>
        <input type="text" name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' />
        {errors?.password && <div className='error'>{errors.password}</div>}
        </div>

        <div>
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input type="text" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Enter your password' />
        {errors?.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}
        </div>

        <div>
        <label htmlFor="age">Age: </label>
        <input type="number" name='age' value={formData.age} onChange={handleChange} placeholder='Enter your age' />
        {errors?.age && <div className='error'>{errors.age}</div>}
        </div>

        <div>
        <label htmlFor="gender">Gender: </label>
        <select name='gender' value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors?.gender && <div className='error'>{errors.gender}</div>}
        </div>

        <div>
        <label htmlFor="interest">Interest: </label>
        <label ><input type="checkbox" name='coding' value={formData.interest.includes("coding")} onChange={handleCheckboxChange}/>Coding</label>
        <label ><input type="checkbox" name='sports' value={formData.interest.includes("sports")} onChange={handleCheckboxChange}/>Sports</label>
        <label ><input type="checkbox" name='reading' value={formData.interest.includes("reading")} onChange={handleCheckboxChange}/>Reading</label>
        {errors?.interest && <div className='error'>{errors.interest}</div>}
        </div>

        <div>
        <label htmlFor="birthdate">Date of Birth: </label>
        <input type="date" name='birthdate' value={formData.birthDate} onChange={handleChange} placeholder='Enter your bithdate' />
        {errors?.birthDate && <div className='error'>{errors.birthDate}</div>}
        </div>

        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
