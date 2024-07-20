import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import axios from 'axios'
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

import AdminMenu from '../../components/Layout/AdminMenu'


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/auth/users');
        setUsers(response.data); // Set the users array in state
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);
      
    
      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('/api/v1/auth/users');
            setUsers(response.data); // Set the users array in state
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
        };
    
        fetchUsers();
      }, []);

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          
            
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
                  
                  <tbody className=''>
                    {
                        users.map((el,index) => {
                          return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                
                            </tr>
                                )
                            })
                            }
                    </tbody>
                  
                </table>
              </div>
        </div>
        </div>
      

    </Layout>
            );
}

export default AllUsers