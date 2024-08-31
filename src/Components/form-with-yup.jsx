import React, {useState} from 'react'
import * as Yup from 'yup';

const FormWithYup = () => {
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

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format")
  .required("Email is required"),
  phoneNumber: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits")
  .required("Phone number is required"),
  password: Yup.string().required("password is required")
  .min(8, "password must be at least 8 characters")
  .matches(/[!@#$%^&*()<>?":{}|]/, "password must contain one symbol")
  .matches(/[0-9]/, "password must contain one number")
  .matches(/[A-Z]/, "password must contain one uppercase")
  .matches(/[a-z]/, "password must contain one lowercase"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match")
  .required("Password is required"),
  age: Yup.number().typeError('Age must be number')
  .required("Age is required")
  .min(18, "You must be at least 18 years old")
  .max(100, "You can't be older than 100 years"),
  gender: Yup.string().required("Gender is required"),
  interest: Yup.array().min(1, "Select at least one interest")
  .required("First name is required"),
  birthDate: Yup.date().required("First name is required"),
})


const handleSubmit = async (e) => {
   e.preventDefault();

   const nonParsed = {
    firstName: "Piyush",
    lastName: "Agarwal",
    email: "piyush@example.com",
    phoneNumber: "1231234218",
    password: "123456Qq*",
    confirmPassword: "123456Qq*",
    age: "18",
    gender: "male",
    interests: ["coding"],
    birthDate: "2024-02-12",
  };

  const parsedUser = validationSchema.cast(nonParsed);

  console.log(nonParsed, parsedUser);
  
   try {
     await validationSchema.validate(formData, {abortEarly: false});
     console.log("Form Submitted", formData);
   } catch(error) {
     const newErrors = {};

     error.inner.forEach((err) => {
      newErrors[err.path] = err.message;
     });

     setErrors(newErrors);
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

export default FormWithYup;
