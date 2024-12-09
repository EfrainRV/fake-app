'use client'

import { useEffect, useState, useReducer } from "react";
import { UserCard } from "@/components/UserCard";
import { GenerateButton } from "@/components/GenerateButton";
import { SaveButton } from "@/components/SaveButton";
import { UsersListContainer } from "@/components/UsersListContainer";
import { Paginator } from "@/components/Paginator";
import { ImageForm } from "@/components/ImageForm";
import { PdfButton } from "@/components/PdfButton";
import { SearchBar } from "@/components/SearchBar";

interface IAction {
  type: string;
  payload: number | string;
}

interface IState {
  page: number;
  limit: number;
  query: string;
}

const initialState: IState = {
  page: 1,
  limit: 4,
  query: ""
};

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: Number(action.payload) };
    case 'SET_LIMIT':
      return { ...state, limit: Number(action.payload) };
    case 'SET_QUERY':
      return { ...state, query: String(action.payload) };
    default:
      return state;
  }
}

export default function Home() {
  const[userData, setUserData] = useState({
    name: "",
    email: ""
  });
  const [userImage, setUserImage] = useState("");
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(reducer, initialState);

  const getUsers = async (page: number, limit: number, query:string) => {
    const response = await fetch(`/api/users?page=${page}&limit=${limit}&query=${query}`);
    const { users, totalUsers } = await response.json();

    setUsers(users);
    setTotalUsers(totalUsers);
  }

  useEffect(() => {
    getUsers(state.page, state.limit, state.query);
  }, [state]);

  return (
    <main className="w-full h-screen">
      <h1 className="text-center text-4xl font-semibold">Faker App</h1>

      <div className="flex justify-center mt-5">
        <GenerateButton 
          setUserData={setUserData} 
          userData={userData} 
        />
      </div>

      <div className="w-full mt-8 flex flex-col justify-center items-center gap-4">
        <UserCard 
          userData={userData}
        />

        <ImageForm 
          userImage={userImage} 
          setUserImage={setUserImage} 
        />
      </div>

      <div className="flex gap-5 justify-center mt-5">
        <SaveButton 
          userData={userData} 
          setUserData={setUserData} 
          getUsers={getUsers}
          userImage={userImage} 
          setUserImage={setUserImage} 
        />
        <PdfButton sorted={false} />
        <PdfButton sorted={true} />
      </div>

      <SearchBar
        dispatch={dispatch}
      />
      <UsersListContainer users={users}/>
      <Paginator 
        totalUsers={totalUsers} 
        page={state.page}
        dispatch={dispatch}
        limit={state.limit}
      />
    </main>
  );
}
