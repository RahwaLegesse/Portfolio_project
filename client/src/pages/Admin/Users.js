import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import axios from 'axios'
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

import AdminMenu from '../../components/Layout/AdminMenu'

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [auth, setAuth] = useAuth();
  

    const fetchAllUsers = async() =>{
       
      
      const {response }= await axios.get("/api/v1/auth/users");

      if (response.success) {
        setAllUsers(response.message);
      }
        
        if(response.error){
            toast.error(response.message)
        }
        

    }

    useEffect(() => {
      fetchAllUsers();
    }, []);
  

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          
            
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sr</th>
                      <th scope="col">name</th>
                      <th scope="col">email</th>
                      <th scope="col"> role</th>
                      <th scope="col">date</th>
                      </tr>
                  </thead>
                  <tbody>
          {allUser.map((el, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{el?.name}</td>
            </tr>
          ))}
        </tbody>
                </table>
              </div>
        </div>
        </div>
      

    </Layout>
            );
}

export default AllUsers