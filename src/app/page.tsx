'use client'

import { useEffect, useState } from "react";
import { UserCard } from "@/components/UserCard";
import { GenerateButton } from "@/components/GenerateButton";
import { SaveButton } from "@/components/SaveButton";
import { UsersList } from "@/components/UsersList";

export default function Home() {
  const[userData, setUserData] = useState({
    name: "",
    email: ""
  });
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch('/api/users');
    const dataUsers = await response.json();
    setUsers(dataUsers);
    console.log(users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="w-full h-screen">
      <h1 className="text-center text-4xl font-semibold">Faker App</h1>

      <div className="flex justify-center mt-5">
        <GenerateButton setUserData={setUserData} userData={userData} />
      </div>
s
      <div className="w-full mt-16 flex justify-center">
        <UserCard userData={userData} />
      </div>

      <div className="flex justify-center mt-5">
        <SaveButton userData={userData} getUsers={getUsers} />
      </div>

      <UsersList users={users}/>
    </main>
  );
}
