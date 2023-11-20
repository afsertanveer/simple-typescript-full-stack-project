import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { user } from "./models/user";
import * as NotesApi from "./network/notes_api";
import NotFoudPage from "./pages/NotFoudPage";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import styles from "./styles/app.module.css";
import Main from "./Layout/Main";
function App() {
  
  const [loggedInUser, setLoggedInUser] = useState<user | null>(null);
  useEffect(() => {
      async function fetchLoggedInUser() {
        try {
          const user = await NotesApi.getLoggedInUser();
          setLoggedInUser(user);
          console.log(user);
          
        } catch (error) {
          console.error(error);
        }
      }
      fetchLoggedInUser();
    }, []);
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Main></Main>,
        children: [
          {
            path: "/",
            element: <NotesPage loggedInUser={loggedInUser} />,
          },
          {
            path: "/privacy",
            element: <PrivacyPage/>,
          },
        ],
      },
      {
        path: "/*",
        element: <NotFoudPage></NotFoudPage>
        ,
      }
    ]);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);
  return (
    <div>
      <Container className={styles.pageContainer}>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
