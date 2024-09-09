import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const backgroundStyle = {
  backgroundImage: "url('/bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "100vw",
};

interface ContactListProps {
  contacts: Contact[];
  fetchContacts: () => void;
}

const ContactList = ({ contacts, fetchContacts }: ContactListProps) => {
  const navigate = useNavigate();

  // State for managing success and error messages
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddNewContact = () => {
    navigate("/contact-form");
  };

  const handleEdit = (contact: Contact) => {
    navigate("/contact-form", { state: { existingContact: contact } });
    fetchContacts();
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessage("Contact deleted successfully!");
        fetchContacts();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="p-4" style={backgroundStyle}>
      <h2 className="text-2xl font-bold mb-4 text-white">Contact List</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleAddNewContact}
      >
        Add New Contact
      </button>

      {/* Success and Error Messages */}
      {message && (
        <div className="mb-4 p-2 bg-green-500 text-white rounded-md">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded-md">{error}</div>
      )}

      <div className="w-full backdrop-blur-md bg-white/50 p-4 rounded-md">
        <table className="w-full border-gray-300 text-black">
          <thead>
            <tr className="text-black">
              <th className="p-2 text-left">First Name</th>
              <th className="p-2 text-left">Last Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="text-black">
                <td className="p-2">{contact.firstName}</td>
                <td className="p-2">{contact.lastName}</td>
                <td className="p-2">{contact.email}</td>
                <td className="p-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 ml-2"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
