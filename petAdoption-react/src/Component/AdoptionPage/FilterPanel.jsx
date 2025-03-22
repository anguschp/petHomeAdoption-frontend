import React , {useState} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import '../../styles/filterPanel.css'
import {useUtils} from "../../context-store/UtilConext"




const FilterPanel = ({setFilterList , setSearchSomething}) => {

    const { breeds, genders , loading, error } = useUtils();

    const breedSelector = [{breedId: "" , breedName:"Select Breed" , created_date:"" , last_modified_date:""}, ...breeds];
    const genderSelector = [{id: "" , gender_name:"Select Gender" , created_date:"" , last_modified_date:""}, ...genders];

    console.log(breedSelector)
    console.log(genderSelector)

    const [filters, setFilters] = useState({
        name: '',
        serial: '',
        breed: '',
        age: '',
        gender: ''
      });


      const handleChange = (field) => (e) => {
        setFilters(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        console.log("check temp: " + JSON.stringify(filters))
        setSearchSomething();
        setFilterList(filters);
    }


    const handleClearFilter = ()=>{
        setFilters({
            
            name: '',
            serial: '',
            breed: '',
            age: '',
            gender: ''
            
        })


    }
  
    return (
        <>

        <Form className='fiterForm'>

            <Form.Group className="mb-3" controlId="formNameField">
                <Form.Label>Pet Name</Form.Label>
                <Form.Control placeholder="Search by Pet Name" onChange={handleChange('name')} value={filters.name}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSerialField">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control placeholder="Search by Serial Number" onChange={handleChange('serial')} value={filters.serial}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAgeField">
                <Form.Label>Age(0 ~ ?)</Form.Label>
                <Form.Control placeholder="Search by Pet Age" onChange={handleChange('age')} value={filters.age}/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBreedField">
                <Form.Label>Breed</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handleChange('breed')} value={filters.breed}>
                    {
                        breedSelector.map((option)=>{
                            return(
                                <option value={option.breedId}>{option.breedName}</option>
                            )
                        })
                    }
                   
                </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formGenderField">
                <Form.Label>Gender</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handleChange('gender')} value={filters.gender}>
                   {
                    genderSelector.map((option)=>{
                        return(
                            <option value={option.id}>{option.gender_name}</option>
                        )
                    })
                   }
                </Form.Select>
            </Form.Group>


            <div style={{textAlign: "center"}}>

                <Button variant="secondary" onClick={handleClearFilter} className='clearFilterBtn'>
                    Clear Filter
                </Button>

                <Button variant="success" type="submit" onClick={handleFormSubmit} className='applyFilterBtn'>
                    Apply
                </Button>

            </div>
           
        </Form>

        </>

  )
}



export default FilterPanel