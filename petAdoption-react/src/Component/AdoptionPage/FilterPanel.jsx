import React , {useState} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import '../../styles/filterPanel.css'




const FilterPanel = ({setFilterList}) => {

    const[name , setFilterName] = useState(null);
    const[serialNo , setFilterSerial] = useState(null);
    const[breed , setFilterBreed] = useState(null);
    const[age , setFilterAge] = useState(null);
    const[gender , setGender] = useState(null);




    const handleNameChange = (e)=>{
        setFilterName(e.target.value || null);
    }

    const handleSerialChange = (e)=>{
        setFilterSerial(e.target.value || null)
    }

    const handleBreedChange = (e)=>{
        setFilterBreed(e.target.value || null)
    }

    const handleAgeChange = (e)=>{
        setFilterAge(e.target.value || null)
    }

    const handleGenderChange = (e)=>{
        setGender(e.target.value || null) 
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        let temp = { name, serialNo, breed, age , gender };
        console.log("check temp: " + JSON.stringify(temp))
        setFilterList(temp);
    }
  
    return (
        <>

        <Form className='fiterForm'>

            <Form.Group className="mb-3" controlId="formNameField">
                <Form.Label>Pet Name</Form.Label>
                <Form.Control placeholder="Search by Pet Name" onChange={handleNameChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSerialField">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control placeholder="Search by Serial Number" onChange={handleSerialChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSerialField">
                <Form.Label>Age</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handleAgeChange}>
                    <option value="">Select age</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBreedField">
                <Form.Label>Breed</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handleBreedChange}>
                    <option value="">Select Breed</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formGenderField">
                <Form.Label>Gender</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handleGenderChange}>
                    <option value="">Select Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </Form.Select>
            </Form.Group>


            <div style={{textAlign: "center"}}>

                <Button variant="success" type="submit" onClick={handleFormSubmit} className='applyFilterBtn'>
                    Apply Filter
                </Button>

            </div>
           
        </Form>

        </>

  )
}



export default FilterPanel