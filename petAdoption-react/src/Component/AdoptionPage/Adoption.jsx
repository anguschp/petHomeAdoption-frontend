import React, {useState , useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/InputGroup';
import { getPetList } from '../../api/apiAgent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass , faXmark} from '@fortawesome/free-solid-svg-icons'
import FilterPanel from '../AdoptionPage/FilterPanel'
import "../../styles/Adoption.css"
import PetListContainer from './PetListContainer';


const Adoption = () => {


  const initialFilter  = {

    "name" : '',
    "serialNo": '',
    "breed": '',
    "age": '',
    "gender": ''

}

  const[filterList , setFilterList] = useState(initialFilter)
  const[searchSomething, setSearchSomething] = useState(false)
  const[petData, setPetData] = useState([]);


  const fetchPetList = async()=>{

    try{

      const apiObject = Object.fromEntries(
        Object.entries(filterList).map(([key, value]) => 
            [key, value === '' ? null : value]
        )
      );
      
      const repsonse = await getPetList(apiObject)
      //console.log("fetch pet list: " + JSON.stringify(repsonse))
      if(repsonse.status == 200)
      {
        setPetData(repsonse.data)
      }

    }catch(err)
    {
      console.log("System error: " + err)
      alert("System error occured, please try again.")
    }

  }
 

  useEffect(()=>{
    console.log("Prepare api parameter: ");
    console.log(JSON.stringify(filterList))

    fetchPetList();

  } , [filterList])


  useEffect(()=>{


  },[])



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

      <div className={`filter-panel-wrapper ${searchSomething ? 'show' : ''}`} >
        <FilterPanel setFilterList={setFilterList} setSearchSomething={setSearchSomething}/>      
      </div>

      <div className={`petListCanvas ${searchSomething ? 'hide' : ''}`}>
        <PetListContainer petData={petData}/>
      </div>

      </>

  )
}

export default Adoption