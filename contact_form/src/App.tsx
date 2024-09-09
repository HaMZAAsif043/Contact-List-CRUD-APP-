import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./components/Contactlist";
import  ContactForm from "./components/ContactForm";
function App() {
  const [contacts, setContacts] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts");
      const data = await response.json();
      setContacts(data.contacts);
      console.log(contacts);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  const modelClose = () => { 
    setModelOpen(false);
  }

  const openCreateModel = () => {
    if (!modelOpen) setModelOpen(true);
  }
    const onUpdate = () => {
      modelClose();
      fetchContacts();
    };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex justify-center items-center">
              <ContactList contacts={contacts} fetchContacts={fetchContacts} />
            </div>
          }
        />
        <Route
          path="/contact-form"
          element={
            <ContactForm updateCallback={onUpdate} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
