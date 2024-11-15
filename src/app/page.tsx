'use client'

import { useEffect, useState } from "react";
import { UserCard } from "@/components/UserCard";
import { GenerateButton } from "@/components/GenerateButton";
import { SaveButton } from "@/components/SaveButton";
import { UsersListContainer } from "@/components/UsersListContainer";
import { Paginator } from "@/components/Paginator";

export default function Home() {
  const[userData, setUserData] = useState({
    name: "",
    email: ""
  });
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const getUsers = async (page: number, limit: number) => {
    const response = await fetch(`/api/users?page=${page}&limit=${limit}`);
    const { users, totalUsers } = await response.json();

    setUsers(users);
    setTotalUsers(totalUsers);
    // console.log(response);
  }

  useEffect(() => {
    getUsers(page, limit);
  }, [page, limit]);

  return (
    <main className="w-full h-screen">
      <h1 className="text-center text-4xl font-semibold">Faker App</h1>

      <div className="flex justify-center mt-5">
        <GenerateButton 
          setUserData={setUserData} 
          userData={userData} 
        />
      </div>

      <div className="w-full mt-16 flex justify-center">
        <UserCard 
          userData={userData} 
        />
      </div>

      <div className="flex justify-center mt-5">
        <SaveButton 
          userData={userData} 
          setUserData={setUserData} 
          getUsers={getUsers} 
        />
      </div>

      <UsersListContainer users={users}/>
      <Paginator 
        totalUsers={totalUsers} 
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
    </main>
  );
}
