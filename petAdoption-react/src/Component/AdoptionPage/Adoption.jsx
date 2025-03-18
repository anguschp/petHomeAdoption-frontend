import React, {useState , useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/InputGroup';
import { getPetList } from '../../api/apiAgent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass , faXmark} from '@fortawesome/free-solid-svg-icons'
import FilterPanel from '../AdoptionPage/FilterPanel'
import "../../styles/Adoption.css"


const Adoption = () => {


  const initialFilter  = {

    "name" : null,
    "serialNo": null,
    "breed": null,
    "age": null,
    "gender": null
}

  const[filterList , setFilterList] = useState(initialFilter)
  const[searchSomething, setSearchSomething] = useState(false)


  const fetchPetList = async()=>{

    try{
      const repsonse = await getPetList(filterList)
      console.log("fetch pet list: " + JSON.stringify(repsonse))
    }catch(err)
    {
      console.log(err)
    }

  }

 

  useEffect(()=>{
    console.log("Prepare api parameter: ");
    console.log(JSON.stringify(filterList))

    fetchPetList();


  } , [filterList])



  const showFilterPanel = ()=>[
    setSearchSomething(true)
  ]

  const closeFilterPanel = ()=>{
    if(searchSomething)
    {
      setSearchSomething(false)
    }
  }


  return (
      
      <>
      
      <InputGroup className="mb-3">

          <InputGroup.Text id="basic-addon1" onClick={closeFilterPanel} as={Button} className='toggleFilter'>
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ display: searchSomething ? "none" : "block" }}/>
              <FontAwesomeIcon icon={faXmark} style={{ display: searchSomething ? "block" : "none" }}/>
          </InputGroup.Text>

          <Form.Control
            placeholder="Search your desire cat"
            aria-label="petSearchInput"
            aria-describedby="basic-addon1"
            style={{background: "none"}}
            onClick={showFilterPanel}
            readOnly
          />
      </InputGroup>

      <div className={`filter-panel-wrapper ${searchSomething ? 'show' : ''}`}
          style={{display: searchSomething?'block':"none"}}>
        <FilterPanel setFilterList={setFilterList}/>      
      </div>

      </>

  )
}

export default Adoption